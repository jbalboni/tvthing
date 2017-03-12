defmodule Guidebox do
  use HTTPoison.Base

    # result = HTTPoison.get! "/v2/search?type=show&field=title&query=#{query}", %{"Authorization" => ""}
  def process_url(url) do
    "http://api-public.guidebox.com/v2/" <> url
  end

  def process_request_headers(headers) do
    Dict.put headers, :Authorization, "3c18d22a5cab12549ac979ea3ffbf5edd9dadc5a"
  end

  def process_response_body(body) do
    body
    |> Poison.decode!
  end
end
