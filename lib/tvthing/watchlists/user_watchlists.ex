defmodule Tvthing.Watchlists.UserWatchlists do
  use Tvthing.Web, :model

  @primary_key false
  schema "user_watchlists" do
    belongs_to :watchlist, Tvthing.Watchlist
    belongs_to :user, Tvthing.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:watchlist_id, :user_id])
    |> validate_required([:watchlist_id, :user_id])
    |> unique_constraint(:user_id, name: :user_watchlists_index)
  end
end
