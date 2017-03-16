defmodule Tvthing.Router do
  use Tvthing.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Tvthing do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", Tvthing do
    pipe_through :api

    get "/search", SearchController, :index

    get "/watchlists", WatchlistController, :index
    post "/watchlists", WatchlistController, :create
    get "/watchlists/:id/shows", WatchlistShowsController, :index
    post "/watchlists/:id/shows", WatchlistShowsController, :add
    # post "/watchlists/:id/reorder", WatchlistShowsController, :reorder
    post "/watchlists/:id/shows/:show_id/snooze", WatchlistShowsController, :snooze
    # post "/watchlists/:id/shows/:show_id/activate", WatchlistController, :activate
    # post "/watchlists/:id/shows/:show_id/archive", WatchlistController, :archive
    # post "/watchlists/:id/shows/:show_id/restore", WatchlistController, :restore
  end
end
