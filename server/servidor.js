const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);
//se inicializa la coneccion de soket
io.on('connection', socket => {
    console.log('server ready')
    socket.send("hello")
    socket.on('conectado', (nombre) => {
        console.log("user connected", nombre)
        io.emit('messages', {nombre: nombre, message: `${nombre} ha entrado en la sala de chat`})
    })

    socket.on('message', (nombre, message) => {
        console.log('message servidor', nombre, message)
        io.emit('messages', {nombre, message})
    })

    socket.on('disconnect', () =>{
        console.log('disconected')
        io.emit('messages',{servidor:"Servidor", mensaje: "Logout"})
    }) 
});

server.listen(3000, () => console.log("server init"));
