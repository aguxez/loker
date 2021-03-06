defmodule LokerWeb.Router do
  use LokerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]

    post "/find_game", LokerWeb.PageController, :find_game
    post "/retrieve_summoner", LokerWeb.PageController, :get_summoner_info
  end

  scope "/", LokerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", LokerWeb do
  #   pipe_through :api
  # end
end
