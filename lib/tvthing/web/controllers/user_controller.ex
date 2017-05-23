defmodule Tvthing.Web.UserController do
  use Tvthing.Web, :controller
  alias Tvthing.Users
  alias Tvthing.Watchlists
  action_fallback Tvthing.Web.FallbackController

  def create(conn, %{"token" => token}) do
    case Users.get_or_add(token) do
      {:ok, user} -> 
        watchlist = Watchlists.get_or_add(user.id)
        render conn, "create.json", user: user, watchlist: watchlist
      {:bad_token, reason} ->
        {:error, %{message: Atom.to_string(reason), status: :unauthorized}}
    end
  end
end
