const socket = io();
let chatFrom = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
socket.on("message" , message => {
    console.log(message);
    outputMessage(message);
    // to scroll auto.
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//get username and room : 

const  {username , room } = Qs.parse(location.search , {
    ignoreQueryPrefix  : true
})
console.log(username , room);

socket.emit("joinchatroom" , {username , room});



chatFrom.addEventListener("submit" , (e) => {
    e.preventDefault(); // tp prevent the default event when submiting a form beacause te data it sent to a file 

    let msg = e.target.elements.msg.value ;
    // emit a message to the server : 
    socket.emit('chatMessage' , msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div = document.createElement("div");
    div.classList.add("message")
    div.innerHTML = `<p class="meta">${message.userName} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`
    document.querySelector(".chat-messages").appendChild(div);
}