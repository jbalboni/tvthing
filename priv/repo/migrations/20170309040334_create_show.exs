defmodule Tvthing.Repo.Migrations.CreateShow do
  use Ecto.Migration

  def change do
    create table(:shows) do
      add :name, :string
      add :tvrage_id, :integer

      timestamps()
    end

  end
end
