defmodule Tvthing.Shows.Show do
  use Tvthing.Web, :model

  @derive {Poison.Encoder, only: [:title, :guidebox_id, :artwork_208x117, :artwork_448x252]}
  schema "shows" do
    field :title, :string
    field :guidebox_id, :integer
    field :artwork_208x117, :string
    field :artwork_448x252, :string

    many_to_many :watchlists, Tvthing.Watchlists.Watchlist, join_through: Tvthing.Watchlists.WatchlistShow
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :guidebox_id])
    |> validate_required([:title, :guidebox_id])
    |> unique_constraint(:guidebox_id)
  end
end
