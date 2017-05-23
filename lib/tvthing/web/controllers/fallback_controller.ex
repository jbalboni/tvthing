defmodule Tvthing.Web.FallbackController do
  use Tvthing.Web, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> render(Tvthing.Web.ErrorView, "changeset.json", errors: changeset.errors)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> render(Tvthing.Web.ErrorView, "404.json")
  end

  def call(conn, {:error, error_map}) do
    conn
    |> put_status(error_map.status)
    |> render(Tvthing.Web.ErrorView, "500.json", message: error_map.message)
  end
end
