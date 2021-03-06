defmodule Tvthing.Shows do
  import Ecto.Query, only: [from: 2]
  alias Tvthing.Repo
  alias Tvthing.Guidebox
  alias Tvthing.Shows.Show

  def search(query) do
    results = Guidebox.get! "search/?type=show&field=title&query=#{URI.encode(query)}"
    results.body
  end

  def get_or_add(guidebox_id) do
    case Repo.get_by(Show, guidebox_id: guidebox_id) do
      %Show{} = show -> 
        show  
      nil -> 
        %{"title" => title,
          "artwork_208x117" => artwork_208x117,
          "artwork_448x252" => artwork_448x252} = Guidebox.get!("shows/#{guidebox_id}").body
        changeset = Show.changeset(%Show{
                                     guidebox_id: guidebox_id, 
                                     title: title,
                                     artwork_208x117: artwork_208x117,
                                     artwork_448x252: artwork_448x252})
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

  def update_shows do
    Repo.all(
      from s in Show,
      select: s
    )
    |> Enum.map(
      fn show ->
        new_data = Guidebox.get!("shows/#{show.guidebox_id}").body
        %{new_data: new_data, show: show}
      end
    ) 
    |> Enum.each(
      fn %{new_data: new_data, show: show} -> 
        Ecto.Changeset.change(show, 
          title: new_data["title"], 
          artwork_208x117: new_data["artwork_208x117"],
          artwork_448x252: new_data["artwork_448x252"])
          |> Repo.update
      end
    )
  end
end

