defmodule Tvthing.WatchlistView do
  use Tvthing.Web, :view

	def render("index.json", %{recs: recs}) do
    recs
  end

	def render("create.json", %{user: user}) do
    user
  end
end
