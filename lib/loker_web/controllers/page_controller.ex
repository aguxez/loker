defmodule LokerWeb.PageController do
  use LokerWeb, :controller

  def index(conn, _params) do
    csrf_token = Poison.encode!(Plug.CSRFProtection.get_csrf_token())

    render conn, "index.html", csrf_token: csrf_token
  end

  def find_game(conn, %{"summonerName" => summoner} = params) do
    server = String.downcase(params["server"])

    {:ok, game} =
      Godfist.active_game(String.to_atom(server), String.trim(summoner))

    json conn, %{game: game}
  end
end
