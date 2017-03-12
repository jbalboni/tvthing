defmodule Tvthing.User do
  use Tvthing.Web, :model

  schema "users" do
    field :email, :string
    field :google_id, :string

    many_to_many :watchlists, Tvthing.Watchlist, join_through: Tvthing.UserWatchlists
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
