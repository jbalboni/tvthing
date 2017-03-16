defmodule Tvthing.ErrorView do
  use Tvthing.Web, :view

  def render("404.json", _assigns) do
    %{error: "Page not found"}
  end

  def render("500.json", assigns) do
    %{error: "Sorry, something went wrong"}
  end

  def render("changeset.json", %{errors: errors}) do
    errors
    |> Enum.map(fn {field, {message, _}} -> 
      %{error: "#{field} #{message}"} 
    end)
    |> Enum.at(0)
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "500.json", assigns
  end
end