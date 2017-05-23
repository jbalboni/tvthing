defmodule Tvthing.Guidebox do
  use HTTPoison.Base
  defp token, do: Application.get_env(:tvthing, :guidebox_token)

  def process_url(url) do
    "http://api-public.guidebox.com/v2/" <> url
  end

  def process_request_headers(headers) do
    Dict.put headers, :Authorization, token()
  end

  def process_response_body(body) do
    body
    |> Poison.decode!
  end
end
