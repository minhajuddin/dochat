defmodule Dochat.RoomChannel do
  use Phoenix.Channel

  def join(msg_type, message, socket) do
    {:ok, socket}
  end

  def handle_in("msg", message, socket) do
    broadcast(socket, "recv_msg", message)
    {:noreply, socket}
  end

  def handle_in("typing", message, socket) do
    broadcast_from(socket, "typing", %{username: socket.assigns.username})
    {:noreply, socket}
  end



end
