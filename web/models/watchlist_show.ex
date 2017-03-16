defmodule Tvthing.WatchlistShows do
  use Tvthing.Web, :model

  @primary_key false
  @derive {Poison.Encoder, only: [:watchlist_id, :show_id]}
  schema "watchlists_shows" do
    belongs_to :watchlist, Tvthing.Watchlist
    belongs_to :show, Tvthing.Show
    field :source, :string
    field :state, :integer

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:watchlist_id, :show_id, :state, :source])
    |> validate_required([:watchlist_id, :show_id])
    |> unique_constraint(:show_id, name: :watchlist_shows_index)
  end
end
