defmodule Tvthing.Web.WatchlistController do
  use Tvthing.Web, :controller
  alias Tvthing.Watchlists

  def index(conn, _) do
    recs = Watchlists.get_all()
    render conn, "index.json", recs: recs
  end

  def create(conn, params) do
    case Watchlists.add(params) do
      {:ok, watchlist} -> 
        render conn, "create.json", watchlist: watchlist
      {:error, changeset} -> changeset
    end
  end
end
