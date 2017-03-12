defmodule Tvthing.WatchlistShows do
  use Tvthing.Web, :model

  @primary_key false
  schema "watchlists_shows" do
    belongs_to :watchlist, Tvthing.Watchlist
    belongs_to :show, Tvthing.Show

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:watchlist_id, :show_id])
    |> validate_required([:watchlist_id, :show_id])
  end
end
