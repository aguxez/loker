defmodule LokerWeb.PageController do
  use LokerWeb, :controller

  alias Loker.State.Summoners

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
          IO.inspect("requested game")
          {:ok, new_game} = Godfist.active_game(server, summoner)
          Summoners.save_game_for(summoner, new_game)

          {:ok, new_game}
        game ->
          IO.inspect("game found")
          {:ok, game}
      end

    champ_icons = get_champs_info(game)

    json conn, %{game: game, champ_icons: champ_icons}
  end

  defp get_champs_info(game) do
    game["participants"]
    |> Enum.map(fn x -> x["championId"] end)
    |> Enum.reject(&(&1 == nil))
    |> get_champs_icons()
  end

  # DataDragon is a 3rd party so the calls don't count to the rate-limits.
  defp get_champs_icons(champs) do
    {:ok, champ_data} = Godfist.DataDragon.Data.champions()

    for {_k, v} <- champ_data["data"], team_champ <- champs do
      if String.to_integer(v["key"]) == team_champ do
        %{v["key"] => Godfist.DataDragon.champ_square(v["name"])}
      end
    end
    |> Enum.reject(&(&1 == nil))
  end

  def get_summoner_info(conn, %{"name" => name, "champId" => champ_id}) do
    json conn, %{name: name, champId: champ_id}
  end
end
