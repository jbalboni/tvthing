defmodule Tvthing.Watchlists do
  import Ecto.Query, only: [from: 2]
  alias Tvthing.Repo
  alias Tvthing.Shows
  alias Tvthing.Shows.Show
  alias Tvthing.Watchlists.Watchlist
  alias Tvthing.Watchlists.WatchlistShow
  @show_active 1
  @show_snoozed 2
  @show_archived 3

  # will eventually filter by user
  def get_all() do
    Repo.all(Watchlist)
  end

  def add(params) do
    Watchlist.changeset(%Watchlist{}, params)
      |> Repo.insert
  end

  def get_shows(id) do
    query = from ws in WatchlistShow,
      join: s in Show, where: s.id == ws.show_id,
      where: ws.watchlist_id == ^id,
      select: %{show_id: ws.show_id, name: s.name}
    Repo.all(query)
  end

  def add_show(watchlist_id, guidebox_id) do
    show = Shows.get_or_add(guidebox_id)

    %WatchlistShow{
      watchlist_id: String.to_integer(watchlist_id),
      show_id: show.id
    }
      |> WatchlistShow.changeset
      |> Repo.insert
  end

  defp update(id, show_id, params) do
    Repo.get_by!(WatchlistShow, watchlist_id: id, show_id: show_id)
      |> Ecto.Changeset.change(params)
      |> Repo.update
  end

  def snooze_show(id, show_id) do
    update(id, show_id, state: @show_snoozed)
  end

  def activate_show(id, show_id) do
    update(id, show_id, state: @show_active)
  end

  def archive_show(id, show_id) do
    update(id, show_id, state: @show_archived)
  end
end
