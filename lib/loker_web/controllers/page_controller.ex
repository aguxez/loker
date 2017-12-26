defmodule LokerWeb.PageController do
  use LokerWeb, :controller

  alias Loker.State.Summoners
  alias Godfist.DataDragon

  def index(conn, _params) do
    csrf_token = Poison.encode!(Plug.CSRFProtection.get_csrf_token())

    render conn, "index.html", csrf_token: csrf_token
  end

  def find_game(conn, params) do
    summoner = String.trim(params["summonerName"])

    server =
      params["server"]
      |> String.downcase()
      |> String.to_atom()

    # Initializes the 'cache'
    Summoners.start_link(summoner)

    # This whole case statement can be a confusing since it repeats the var
    # names a little
    {:ok, game} =
      case Summoners.get_game_for(summoner) do
        [] ->
          {:ok, new_game} = Godfist.active_game(server, summoner)
          Summoners.save_game_for(summoner, new_game)

          {:ok, new_game}
        game ->
          {:ok, game}
      end

    champ_icons = get_champs_info(game)

    json(conn, %{game: game, champ_icons: champ_icons})
  end

  defp get_champs_info(game) do
    game["participants"]
    |> Enum.map(fn x -> x["championId"] end)
    |> Enum.reject(&(&1 == nil))
    |> get_champs_icons(&DataDragon.champ_square/1)
  end

  # DataDragon is a 3rd party so the calls don't count to the rate-limits.
  defp get_champs_icons(champs, module_function) do
    {:ok, champ_data} = DataDragon.Data.champions()

    for {_k, v} <- champ_data["data"], team_champ <- champs do
      # 'module_function' is the DataDragon function to be used so we can reuse
      # this function
      if String.to_integer(v["key"]) == team_champ do
        %{v["key"] => module_function.(v["name"])}
      end
    end
    |> Enum.reject(&(&1 == nil))
  end

  def get_summoner_info(conn, %{"summId" => summId, "champId" => champ_id} = params) do
    string_champ_id = to_string(champ_id)
    server =
      params["server"]
      |> String.downcase()
      |> String.to_atom()

    # Retrieving information of a single summoner.
    # TODO: Add this to a 'cache' too
    %{"tier" => tier, "rank" => rank} = get_solo_league(server, summId)

    # Look for a nicer way of doing this pattern match.
    [%{^string_champ_id => load_link}] =
      get_champs_icons([champ_id], &DataDragon.champ_loading/1)

    json(conn, %{tier: tier, rank: rank, champ_loading: load_link})
  end

  defp get_solo_league(server, name) do
    {:ok, league} = Godfist.League.positions(server, name)

    Enum.find(league, &(&1["queueType"] === "RANKED_SOLO_5x5"))
  end
end
