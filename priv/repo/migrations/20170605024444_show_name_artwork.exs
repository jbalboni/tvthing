defmodule Tvthing.Repo.Migrations.ShowNameArtwork do
  use Ecto.Migration

  def change do
    rename table(:shows), :name, to: :title
    alter table(:shows) do
      add :artwork_large, :string
      add :artwork_small, :string
    end
  end
end
