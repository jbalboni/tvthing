defmodule Tvthing.Repo.Migrations.AddConstraints do
  use Ecto.Migration

  def change do
    create unique_index(:shows, [:guidebox_id])
    create unique_index(:watchlists_shows, [:show_id, :watchlist_id], name: :watchlist_shows_index)
    create unique_index(:user_watchlists, [:user_id, :watchlist_id], name: :user_watchlists_index)
  end
end
