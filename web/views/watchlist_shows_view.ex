defmodule Tvthing.WatchlistShowsView do
  use Tvthing.Web, :view

	def render("index.json", %{shows: shows}) do
    shows
  end

	def render("create.json", %{user: user}) do
    user
  end

	def render("add.json", %{watchlist_show: watchlist_show}) do
    watchlist_show
  end

  def render("error.json", %{changeset: changeset}) do
    changeset
  end
end
