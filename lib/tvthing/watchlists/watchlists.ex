defmodule Tvthing.Watchlists do
  import Ecto.Query, only: [from: 2]
  alias Tvthing.Repo
  alias Tvthing.Shows
  alias Tvthing.Shows.Show
  alias Tvthing.Watchlists.Watchlist
  alias Tvthing.Watchlists.WatchlistShow
  alias Tvthing.Watchlists.UserWatchlists
  @show_active 1
  @show_snoozed 2
  @show_archived 3
  @show_want_to_watch 4

  def get_or_add(user_id) do
    query = from uw in UserWatchlists,
      join: w in Watchlist, where: w.id == uw.watchlist_id,
      where: uw.user_id == ^user_id,
      select: %{id: w.id}
    case Repo.one(query) do
      nil -> add(user_id)
      watchlist -> watchlist
    end
  end

  def add(user_id, name \\ "default") do
    watchlist = Watchlist.changeset(%Watchlist{}, %{name: name})
    |> Repo.insert!

    UserWatchlists.changeset(%UserWatchlists{}, %{user_id: user_id, watchlist_id: watchlist.id})
    |> Repo.insert!
  end

  def get_shows_by_watchlist(id, user_id) do
    case Repo.get_by(UserWatchlists, watchlist_id: id, user_id: user_id) do
      nil -> {:error, :unauthorized}
      _ -> get_shows(id)
    end
  end

  defp get_shows(id) do
    query = from ws in WatchlistShow,
      join: s in Show, where: s.id == ws.show_id,
      where: ws.watchlist_id == ^id,
      select: s
    Repo.all(query)
  end

  def add_show(watchlist_id, guidebox_id, state, source) do
    show = Shows.get_or_add(guidebox_id)

    %WatchlistShow{
      watchlist_id: String.to_integer(watchlist_id),
      show_id: show.id,
      state: state,
      source: source
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
