defmodule Tvthing.ScheduledTask do
  use GenServer
  alias Tvthing.Shows

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:work, state) do
    # Do the work you desire here
    Shows.update_shows()
    schedule_work() # Reschedule once more
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 12 * 60 * 60 * 1000) # In 2 hours
  end
end
