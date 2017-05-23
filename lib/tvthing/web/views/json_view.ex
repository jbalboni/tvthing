defmodule Tvthing.Web.JsonView do
  use Tvthing.Web, :view

  def render("index.json", %{payload: payload}) do
    payload
  end

  def render("changeset.json", %{errors: errors}) do
    errors
    |> Enum.map(fn {field, {message, _}} -> 
      %{error: "#{field} #{message}"} 
    end)
    |> Enum.at(0)
  end
end
