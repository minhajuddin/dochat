import {Socket} from "phoenix"

function getUsername() {

  let username = localStorage.getItem("username")

  if (username){
    return username;
  }

  username = prompt("What should we call you?")
  localStorage.setItem("username", username)
  return username;
}

let username = getUsername()
let socket = new Socket("/socket", {params: {username: username}})
socket.connect()

let channel = socket.channel("rooms:topic", {})
channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket


const input = document.getElementById("input");
const messages = document.getElementById("messages");

input.addEventListener("keyup", function(e){
  //e.preventDefault()

  if (e.keyCode == 13){
    channel.push("msg", {body: input.value, username: username})
    input.value = ""
    return
  }


  channel.push("typing", {username: username})

})


channel.on("recv_msg", function(msg){
  messages.innerHTML += `<p>[${msg.username}] ${msg.body}</p>`
})

channel.on("typing", function(msg){
  info.innerHTML = `${msg.username} is typing...`
})
