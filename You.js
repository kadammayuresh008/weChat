const express = require("express")
// const Peer = require("Peer")
const app =express()
const http = require('http').createServer(app)

var count=0


const PORT = process.env.PORT||3000


http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname+"/public"))

app.get('/',(req , res)=>{
    res.sendFile(__dirname+"/index.html")
})


// Socket

const io = require('socket.io')(http)
// const  peer = new Peer();

// peer.on('open' , (id)=>{
//     socket.emit("newUser" , id);
// });



io.on('connection',(socket)=>{
    socket.on("Sendingmsg",(msg)=>
    {
        socket.broadcast.emit('Sendingmsg',msg)
    })
})


// peer.on('call' , call=>{ 
  
//     // Here client 2 is answering the call 
//     // and sending back their stream 
//     call.answer(stream);  
//         const vid = document.createElement('video'); 
  
//     // This event append the user stream.  
//     call.on('stream' , userStream=>{ 
//         addVideo(vid , userStream); 
//     }) 
//     call.on('error' , (err)=>{ 
//         alert(err) 
//     }) 
//   })
