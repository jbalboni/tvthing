defmodule Tvthing.WatchlistController do
  use Tvthing.Web, :controller
  alias Tvthing.Watchlist

  def index(conn, _) do
    # render conn, "index.json", results: results.body
    recs = Repo.all(Watchlist)
    render conn, "index.json", recs: recs
  end

  def create(conn, params) do
    changeset = Watchlist.changeset(%Watchlist{}, params)
    case Repo.insert(changeset) do
      {:ok, user} -> 
        render conn, "create.json", user: user
      {:error, changeset} -> changeset
    end
  end
end
