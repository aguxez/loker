defmodule Loker.State.Summoners do
  @moduledoc """
  Module in charge of saving games, kind of like a Cache for a certain amount of
  time, games are not saved forever.
  """

  # TODO: Send a message that kills the GenServer so the game is not saved
  # forever

  use GenServer

  # API
  def start_link(name),
    do: GenServer.start_link(__MODULE__, [], name: via_tuple(name))

  def save_game_for(name, game),
    do: GenServer.cast(via_tuple(name), {:save, game})

  def get_game_for(name),
    do: GenServer.call(via_tuple(name), :game)

  defp via_tuple(name),
    do: {:via, Registry, {:summoners_game_registry, name}}

  # Server
  def init(state) do
    kill_server()

    {:ok, state}
  end

  defp kill_server,
    do: Process.send_after(self(), :kill, 60_000 * 5)

  def terminate(_reason, _), do: :ok

  def handle_cast({:save, game}, _state) do
    {:noreply, game}
  end

  def handle_call(:game, _from, state) do
    {:reply, state, state}
  end

  def handle_info(:kill, state) do
    {:stop, :normal, state}
  end
end
