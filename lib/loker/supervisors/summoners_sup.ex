defmodule Loker.Supervisors.SummonersSup do
  @moduledoc """
  Supervisor for the Summoners' game 'cache'
  """

  use Supervisor

  alias Loker.State.Summoners

  def start_link,
    do: Supervisor.start_link(__MODULE__, [], name: __MODULE__)

  def init(_arg) do
    Supervisor.init([
      {Summoners, []},
    ], strategy: :simple_one_for_one)
  end
end
