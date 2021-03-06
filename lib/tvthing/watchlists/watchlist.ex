defmodule Tvthing.Watchlists.Watchlist do
  use Tvthing.Web, :model
  require IEx

  @derive {Poison.Encoder, only: [:id, :name, :shows]}
  schema "watchlists" do
    field :name, :string

    many_to_many :shows, Tvthing.Shows.Show, join_through: Tvthing.Watchlists.WatchlistShow
    many_to_many :users, Tvthing.Users.User, join_through: Tvthing.Watchlists.UserWatchlists
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
