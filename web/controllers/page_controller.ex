defmodule Dochat.PageController do
  use Dochat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
