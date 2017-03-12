defmodule Tvthing.Repo.Migrations.AddWatchlistShowTable do
  use Ecto.Migration

  def change do
    create table(:watchlists_shows, primary_key: false) do
      add :show_id, references(:shows, on_delete: :delete_all)
      add :watchlist_id, references(:watchlists, on_delete: :delete_all)

      timestamps()
    end

  end
end
