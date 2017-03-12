defmodule Tvthing.Repo.Migrations.AddUserWatchlistTable do
  use Ecto.Migration

  def change do
    create table(:user_watchlists, primary_key: false) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :watchlist_id, references(:watchlists, on_delete: :delete_all)

      timestamps()
    end
  end
end
