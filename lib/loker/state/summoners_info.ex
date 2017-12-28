defmodule Loker.State.SummonersInfo do
  @moduledoc """
  Module in charge of keeping 'state' of information of single Summoners for
  a period of time
  """

  use GenServer

  # API
  def start_link(name),
    do: GenServer.start_link(__MODULE__, [], name: via_tuple(name))

  def save_info_for(name, info),
    do: GenServer.cast(via_tuple(name), {:save, info})

  def get_info_for(name),
    do: GenServer.call(via_tuple(name), :get_info)

  defp via_tuple(name),
    do: {:via, Registry, {:summoners_info_registry, name}}

  # Server
  def init(state) do
    kill_server()

    {:ok, state}
  end

  def kill_server,
    do: Process.send_after(self(), :kill, 60_000 * 5)

  def terminate(_reason, _state), do: :ok

  def handle_cast({:save, info}, _state),
    do: {:noreply, info}

  def handle_call(:get_info, _from, state),
    do: {:reply, state, state}

  def handle_info(:kill, state),
    do: {:stop, :normal, state}
end
