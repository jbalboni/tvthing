defmodule Tvthing.SearchController do
  use Tvthing.Web, :controller

  def index(conn, %{"query" => query}) do
    results = Guidebox.get! "search/?type=show&field=title&query=#{query}"
    render conn, "index.json", results: results.body
  end
end
