defmodule Tvthing.Repo.Migrations.ArtworkName do
  use Ecto.Migration

  def change do
    rename table(:shows), :artwork_small, to: :artwork_208x117
    rename table(:shows), :artwork_large, to: :artwork_448x252
  end
end
