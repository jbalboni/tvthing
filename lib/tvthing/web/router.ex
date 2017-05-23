defmodule Tvthing.Web.Router do
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
		plug Guardian.Plug.VerifyHeader, realm: "Bearer"
		plug Guardian.Plug.EnsureAuthenticated
		plug Guardian.Plug.LoadResource
		plug Guardian.Plug.EnsureResource
  end

  pipeline :api_public do
    plug :accepts, ["json"]
  end

  scope "/api/public", Tvthing.Web do
    pipe_through :api_public

    get "/search", SearchController, :index
    post "/users", UserController, :create
    get "/shows/:id", ShowController, :index
  end

  scope "/api", Tvthing.Web do
    pipe_through :api

    get "/watchlists", WatchlistController, :index
    post "/watchlists", WatchlistController, :create
    get "/watchlists/:id/shows", WatchlistShowsController, :index
    post "/watchlists/:id/shows", WatchlistShowsController, :add
    # post "/watchlists/:id/reorder", WatchlistShowsController, :reorder
    post "/shows/:show_id/snooze", WatchlistShowsController, :snooze
    post "/shows/:show_id/activate", WatchlistController, :activate
    post "/shows/:show_id/archive", WatchlistController, :archive
  end

  scope "/", Tvthing.Web do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end

end
