defmodule Tvthing.Web.ShowController do
  use Tvthing.Web, :controller
  alias Tvthing.Shows

  def index(conn, %{"id" => id}) do
    results = Shows.get_sources(id)
    render conn, "index.json", results: results
  end
end
