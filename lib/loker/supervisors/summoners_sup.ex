defmodule Loker.Supervisors.SummonersSup do
  @moduledoc """
  Supervisor for the Summoners' game 'cache'
  """

  use Supervisor

  alias Loker.State.{SummonersGame, SummonersInfo}

  def start_link,
    do: Supervisor.start_link(__MODULE__, [], name: __MODULE__)

  def init(_arg) do
    Supervisor.init([
      {SummonersGame, []}
    ], strategy: :simple_one_for_one)

    Supervisor.init([
      {SummonersInfo, []}
    ], strategy: :simple_one_for_one)
  end
end
