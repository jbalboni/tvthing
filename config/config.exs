# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tvthing,
  ecto_repos: [Tvthing.Repo],
  guidebox_token: System.get_env("GUIDEBOX_TOKEN")

# Configures the endpoint
config :tvthing, Tvthing.Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "vEt7a1gQeX9NNyItL6LD8XtVYv8w6o3Rr0yUsf7BNi4m2i9FzWaaYzGdi8hSh8w5",
  render_errors: [view: Tvthing.Web.ErrorView, accepts: ~w(json)],
  pubsub: [name: Tvthing.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :tvthing, :auth0,
  app_baseurl: System.get_env("AUTH0_BASEURL"),
  app_id: System.get_env("AUTH0_APP_ID"),
  app_secret: System.get_env("AUTH0_APP_SECRET")
    |> System.get_env
    |> Kernel.||("")
    |> Base.url_decode64
    |> elem(1)

config :guardian, Guardian,
  allowed_algos: ["HS256"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: System.get_env("AUTH0_BASEURL"),
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: false, # optional
  secret_key: System.get_env("AUTH0_APP_SECRET"),
  serializer: Tvthing.GuardianSerializer
# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
