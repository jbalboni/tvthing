defmodule Tvthing.PageController do
  use Tvthing.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
