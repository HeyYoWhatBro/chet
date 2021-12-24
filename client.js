
const io = require('socket.io-client');
const url = "URL-LINK"
const socket = io(url);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});
console.log("Tuliskan Nama Kamu")

rl.question("Tuliskan Nama Kamu", (text) => {
    socket.emit('new', text.trim());
    console.log("Kamu Sudah Memasuki Chat");
    process.stdout.write("> ");
});

socket.on("message", (text) => {
    process.stdout.write("\r\x1b[K")
    console.log(text);
    process.stdout.write(">");
});

rl.prompt();
rl.on('line', (text) => {
    socket.emit('message', text.trim());
    process.stdout.write("» ");
    rl.prompt();
});
