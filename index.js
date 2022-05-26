const express = require('express');
const app = express();
const path = require('path');
const port = process.env.Port || 8000;
const http = require('http').createServer(app);

const io = require('socket.io')(http);

const staticPath = path.join(__dirname,"/client");

app.use(express.static(staticPath));
app.get('/',(req,res)=>{
    res.render("index.html");
})

http.listen(port,(req,res)=>{
    console.log(`Listening to the port ${port}`);
});


io.on('connection',(socket)=>{
    console.log("user Connected");
    socket.on('messege',(msg)=>{
        socket.broadcast.emit('messege',msg);
    })
})

// console.log(path.join(__dirname,'/client'));