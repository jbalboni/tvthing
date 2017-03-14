defmodule Tvthing.Show do
  use Tvthing.Web, :model

  @derive {Poison.Encoder, only: [:name, :guidebox_id]}
  schema "shows" do
    field :name, :string
    field :guidebox_id, :integer

    many_to_many :watchlists, Tvthing.Watchlist, join_through: Tvthing.WatchlistShows
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :guidebox_id])
    |> validate_required([:name, :guidebox_id])
    |> unique_constraint(:guidebox_id)
  end
end
