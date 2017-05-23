defmodule Tvthing.Shows do
  alias Tvthing.Repo
  alias Tvthing.Guidebox
  alias Tvthing.Shows.Show

  def search(query) do
    results = Guidebox.get! "search/?type=show&field=title&query=#{query}"
    results.body
  end

  def get_or_add(guidebox_id) do
    case Repo.get_by(Show, guidebox_id: guidebox_id) do
      %Show{} = show -> 
        show  
      nil -> 
        %{"title" => title} = Guidebox.get!("shows/#{guidebox_id}")
        changeset = Show.changeset(%Show{guidebox_id: guidebox_id, name: title})
        {:ok, show} = Repo.insert(changeset)
        show
    end 
  end

  defp get_source_list(%{"android" => android, "ios" => ios, "web" => web}) do
    [android, ios, web]
    |> Enum.map(&(&1["episodes"]["all_sources"]))
    |> Enum.concat
    |> Enum.map(&(%{source: &1["source"], display_name: &1["display_name"]}))
    |> Enum.sort
    |> Enum.dedup
  end

  def get_sources(id) do
    case Guidebox.get("shows/#{id}/available_content") do
      {:ok, results} -> get_source_list(results.body["results"])
      {:errors, error} -> {:error, error.reason}
    end
  end
end

