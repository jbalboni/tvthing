defmodule Tvthing.Web.WatchlistShowsController do
  use Tvthing.Web, :controller
  alias Tvthing.Watchlists
  alias Tvthing.Web.JsonView
  action_fallback Tvthing.Web.FallbackController

  def index(conn, %{"id" => id}) do
    user = Guardian.Plug.current_resource(conn)
    shows = Watchlists.get_shows_by_watchlist(id, user.id)
    render conn, JsonView, "index.json", payload: shows
  end

  def add(conn, %{"id" => id, "guidebox_id" => guidebox_id, "state" => state, "source" => source }) do
    {:ok, watchlist_show } = Watchlists.add_show(id, guidebox_id, state, source)
    render conn, JsonView, "index.json", payload: watchlist_show
  end

  def snooze(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.snooze_show(watchlist_id, show_id)
  end

  def archive(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.archive_show(watchlist_id, show_id)
  end

  def activate(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.activate_show(watchlist_id, show_id)
  end
end
