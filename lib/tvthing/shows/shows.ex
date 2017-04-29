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
end

