defmodule Tvthing.Users.User do
  use Tvthing.Web, :model

  @derive {Poison.Encoder, only: [:id, :email]}
  schema "users" do
    field :email, :string
    field :google_id, :string

    many_to_many :watchlists, Tvthing.Watchlists.Watchlist, 
      join_through: Tvthing.Watchlists.UserWatchlists
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:email, :google_id])
    |> validate_required([:email, :google_id])
  end
end
