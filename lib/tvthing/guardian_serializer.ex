defmodule Tvthing.GuardianSerializer do
  @behaviour Guardian.Serializer

  alias Tvthing.Users
  alias Tvthing.Users.User

  def for_token(account = %User{}), do: { :ok, "google-oauth2|#{account.google_id}" }
  def for_token(_), do: { :error, "Unknown resource type" }

  def from_token("google-oauth2|" <> id), do: { :ok, Users.get_by_google(id) }
  def from_token(token), do: { :error, "Unknown resource type" }
end
