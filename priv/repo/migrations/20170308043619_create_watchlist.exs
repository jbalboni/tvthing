defmodule Tvthing.Repo.Migrations.CreateWatchlist do
  use Ecto.Migration

  def change do
    create table(:watchlists) do
      add :name, :string

      timestamps()
    end

  end
end
