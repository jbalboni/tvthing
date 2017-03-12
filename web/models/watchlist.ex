defmodule Tvthing.Watchlist do
  use Tvthing.Web, :model

  @derive {Poison.Encoder, only: [:id, :name]}
  schema "watchlists" do
    field :name, :string

    many_to_many :shows, Tvthing.Show, join_through: Tvthing.WatchlistShows
    many_to_many :users, Tvthing.User, join_through: Tvthing.UserWatchlists
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
  end
end
