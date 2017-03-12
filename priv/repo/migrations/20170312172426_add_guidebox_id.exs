defmodule Tvthing.Repo.Migrations.AddGuideboxId do
  use Ecto.Migration

  def change do
    alter table(:shows) do
      add :guidebox_id, :integer
      remove :tvrage_id
    end
  end
end
