defmodule Tvthing.Web.UserController do
  use Tvthing.Web, :controller
  alias Tvthing.Users
  alias Tvthing.Watchlists

  def create(conn, %{"token" => token}) do
    case Users.get_or_add(token) do
      {:ok, user} -> 
        watchlist = Watchlists.get_or_add(user.id)
        render conn, "create.json", user: user, watchlist: watchlist
      {:error, changeset} -> 
        changeset
      {:bad_token, reason} ->
        conn
        |> put_status(401)
        |> render(Tvthing.ErrorView, "unauthorized.json", reason: reason)
    end
  end
end
