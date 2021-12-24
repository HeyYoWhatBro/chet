// Server Side
const axios = require('axios');
const PORT = 3000;
const users = {};

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const webhook = require('./secret.json').url
console.log("Message Activity:")


app.get('/', (req, res) => {
  res.send("Work")
});

io.on("connection", (socket) => {

 socket.on('new', (name) => {
 users[socket.id] = name;
        
socket.broadcast.emit("message", `${name} Telah Masuk Chat`)

function join() {
const send = {
method: 'post',
url: webhook,
headers: { "content-type": "application/json" },
data: {
 "embeds": [
	 {
	 "title": `${name} Has Joined To Chat Server`,
	  "color": 16716032,
	 },
 ],
}
	}
	axios(send)
}
join()
    });


// Message Functions
async function message(users, msg) {
	const med = {
    method: 'post',
    url: webhook,
    headers: { "content-type": "application/json" },
    data: {
      "content": `${users} » ${msg}`
    },
  }
  axios(med);
}

    socket.on('message', (text) => {
        socket.broadcast.emit("message", `${users[socket.id]} » ${text}`);
				console.log(`${users[socket.id]} » ${text}`)
				message(users[socket.id], text)
    });
});

server.listen(PORT, () => {
  console.log('listening on Port 3000');
});
