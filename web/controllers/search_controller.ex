defmodule Tvthing.SearchController do
  use Tvthing.Web, :controller
  alias Tvthing.Shows

  def index(conn, %{"query" => query}) do
    results = Shows.search(query)
    render conn, "index.json", results: results
  end
end
