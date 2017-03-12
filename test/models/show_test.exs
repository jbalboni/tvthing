defmodule Tvthing.ShowTest do
  use Tvthing.ModelCase

  alias Tvthing.Show

  @valid_attrs %{name: "some content", tvrage_id: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Show.changeset(%Show{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Show.changeset(%Show{}, @invalid_attrs)
    refute changeset.valid?
  end
end
