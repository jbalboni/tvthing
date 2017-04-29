defmodule Tvthing.WatchlistShowsController do
  use Tvthing.Web, :controller
  alias Tvthing.Watchlists

  def index(conn, %{"id" => id}) do
    shows = Watchlists.get_shows(id)
    render conn, "index.json", shows: shows
  end

  def add(conn, %{"id" => id, "guidebox_id" => guidebox_id}) do
    Watchlists.add_show(id, guidebox_id)
      |> handle_error(conn)
  end

  def snooze(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.snooze_show(watchlist_id, show_id)
      |> handle_error(conn)
  end

  def archive(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.archive_show(watchlist_id, show_id)
      |> handle_error(conn)
  end

  def activate(conn, %{"id" => watchlist_id, "show_id" => show_id}) do
    Watchlists.activate_show(watchlist_id, show_id)
      |> handle_error(conn)
  end

  defp handle_error(result, conn) do
    case result do
      {:ok, watchlist_show} ->
        render conn, "add.json", watchlist_show: watchlist_show
      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render(Tvthing.ErrorView, "changeset.json", errors: changeset.errors)
    end
  end
end
