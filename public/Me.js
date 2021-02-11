// const { text } = require("express");

const socket = io()
let Name;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".messageArea")
let heading = document.querySelector(".p")
let members = document.querySelector(".total")
let count=0

do
{
  Name = prompt('Please enter your name.')
//   groname = prompt('Please enter your Groupname.')
  if(Name){
    let msg={
        user : '',
        mssg : `${Name} joined the chat`,
        time : '',
        counter: count++,
    }
    let msg1={
        user : '',
        mssg : `Welcome to weChat`,
        time : '',
        counter: count++,
    }
    members.innerHTML=msg.counter+' members'
    // console.log(count);
    // heading.innerHTML=`${groName}`
    appendMessage(msg1,'startmsg')
    socket.emit("Sendingmsg",msg)
  }
  else{
      continue
  }
}while(!Name)




textarea.addEventListener('keyup',(e)=>
{
    if(e.key == "Enter")
    {
        sendMessage(e.target.value)
    }


})


function sendMessage(message)
{
    var today = new Date()
    var time = today.getHours() + ":" + today.getMinutes()
    let msg={
        user : Name,
        mssg : message.trim(),
        time : time,
    }
    if(msg.user=="")
    {
        appendMessage(msg,'startmsg')
    }
    else
    {
        appendMessage(msg,'outgoing')
    }
 textarea.value=""
 bottom()
 socket.emit("Sendingmsg",msg)

}


function appendMessage(msg,type)
{
  let div = document.createElement('div')
  let  className = type
  div.classList.add(className,'message')

   let ans=`
   <h4>${msg.user}</h4>
   <p>
   ${msg.mssg}
   </p>
   <small><b>${msg.time}</b></small>`  
   
   div.innerHTML = ans 

   messageArea.appendChild(div)

}


socket.on("Sendingmsg",(msg)=>
{
    if(msg.user=="")
    {
        appendMessage(msg,'startmsg')
    }
    else{
    appendMessage(msg,'incoming')
    }
    bottom()
})



function bottom()
{
    messageArea.scrollTop = messageArea.scroll
}


// function videocall(){
//     navigator.mediaDevices.getUserMedia({ 
//         video:true, 
//         audio:true
//       }).then((stream)=>{ 
//           console.log("Video stream started.")
//       }).catch(err=>{ 
//           alert(err.message) 
//       })


//       socket.on('userJoined' , id=>{ 
//         console.log("new user joined") 
        
//         // Calling other client and sending our stream 
//         const call  = peer.call(id , myVideoStream); 
//         const vid = document.createElement('video'); 
//         call.on('error' , (err)=>{ 
//           alert(err); 
//         }) 
        
//         // Taking the stream of the other client 
//         // when they will send it. 
//         call.on('stream' , userStream=>{ 
        
//           // addVideo is a function which append 
//           // the video of the clients 
//           addVideo(vid , userStream); 
//         })})

// }