defmodule Tvthing.WatchlistShowsController do
  use Tvthing.Web, :controller
  alias Tvthing.WatchlistShows
  alias Tvthing.Show

  def index(conn, %{"id" => id}) do
    get_by_watchlist = from ws in WatchlistShows,
      join: s in Show, where: s.id == ws.show_id,
      where: ws.watchlist_id == ^id,
      select: %{show_id: ws.show_id, name: s.name}
    shows = Repo.all(get_by_watchlist)
    render conn, "index.json", shows: shows
  end

  def add(conn, %{"id" => id, "guidebox_id" => guidebox_id}) do
    show_id =
      case Repo.get_by(Show, guidebox_id: guidebox_id) do
        %Show{id: show_id} -> 
          show_id
        nil -> 
          %{"title" => title} = Guidebox.get!("shows/#{guidebox_id}").body
          changeset = Show.changeset(%Show{guidebox_id: guidebox_id, name: title})
          {:ok, show} = Repo.insert(changeset)
          show.id
      end 

    changeset = WatchlistShows.changeset(%WatchlistShows{watchlist_id: String.to_integer(id), show_id: show_id})
    case Repo.insert(changeset) do
      {:ok, watchlist_show} ->
        render conn, "add.json", watchlist_show: watchlist_show
      {:error, changeset} ->
        conn
        |> put_status(400)
        |> render Tvthing.ErrorView, "changeset.json", errors: changeset.errors
    end
  end

end
