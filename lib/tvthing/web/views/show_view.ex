defmodule Tvthing.Web.ShowView do
  use Tvthing.Web, :view

	def render("index.json", %{results: results}) do
    results
  end
end
