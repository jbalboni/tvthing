defmodule Tvthing.Repo.Migrations.AddWatchlistShowFields do
  use Ecto.Migration

  def change do
    alter table(:watchlists_shows) do
      add :state, :integer
      add :source, :string
    end
  end
end
