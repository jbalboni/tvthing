defmodule Tvthing.SearchView do
  use Tvthing.Web, :view

	def render("index.json", %{results: results}) do
    results
  end
end
