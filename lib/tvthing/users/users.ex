defmodule Tvthing.Users do
  alias Tvthing.Repo
  alias Tvthing.Users.User

  def get_by_email(email) do
    Repo.get_by(User, email: email)
  end

  def get_by_google(id) do
    Repo.get_by(User, google_id: id)
  end

  defp get_or_add_user(claims) do
    "google-oauth2|" <> id = claims["sub"]

    case get_by_email(claims["email"]) do
      nil -> 
        User.changeset(%User{email: claims["email"], google_id: id})
          |> Repo.insert
      user ->
        { :ok, user }
    end
  end

  def get_or_add(jwt) do
    case Guardian.decode_and_verify(jwt) do
      { :ok, claims } -> get_or_add_user(claims)
      { :error, reason } -> { :bad_token, reason }
    end
  end
end
