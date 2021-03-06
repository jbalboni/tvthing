defmodule Tvthing.Web.ErrorView do
  use Tvthing.Web, :view

  def render("404.json", _assigns) do
    %{error: "Page not found"}
  end

  def render("500.json", %{message: message}) do
    %{error: message}
  end

  def render("changeset.json", %{errors: errors}) do
    errors
    |> Enum.map(fn {field, {message, _}} -> 
      %{error: "#{field} #{message}"} 
    end)
    |> Enum.at(0)
  end
end
