// const { text } = require("express");

const socket = io()
let Name;
let textarea = document.querySelector("#textarea")
let messageArea = document.querySelector(".messageArea")
// let heading = document.querySelector(".p")

do
{
  Name = prompt('Please enter your name.')
  if(Name){
    let msg={
        user : '',
        mssg : `${Name} joined the chat`,
        time : '',
    }
    // heading.innerHTML=`${Name}`
    appendMessage(msg,'startmsg')
    socket.emit("Sendingmsg",msg)
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