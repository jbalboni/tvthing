import Tvthing.Shows
import Mock
import Tvthing.Guidebox

defmodule ShowsTest do
  use ExUnit.Case
  alias Tvthing.Shows
  alias Tvthing.Guidebox

  test "search guidebox" do
    with_mock Guidebox, [get!: fn(_url) -> %{body: "test"} end] do
      Shows.search("person of interest")

      assert called Guidebox.get!("search/?type=show&field=title&query=person%20of%20interest")
    end
  end
end
