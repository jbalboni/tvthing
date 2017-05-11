defmodule Tvthing.UserView do
  use Tvthing.Web, :view

	def render("create.json", %{user: user, watchlist: watchlist}) do
    %{user: user, watchlist: watchlist}
  end
end
