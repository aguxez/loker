# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :godfist,
token: "RGAPI-c9f794f0-608c-4bef-aaee-87435d7a8381",
rates: :dev

# Configures the endpoint
config :loker, LokerWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Dp9wyI3ijWyz3spBXcKLzmwW6tgLANd7yGd1fGAGb+Ati/ADPU1ORVcD3cJVj201",
  render_errors: [view: LokerWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Loker.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
