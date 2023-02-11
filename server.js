const express = require("express");
const app = express();
const Port = process.env.PORT || 3000 ;
const formatMessage = require("./util/messageFomat");
const {joinUser,getCurrentUser,userLeave,getUserRoom} = require("./util/userfunc")
const path = require("path");
app.use(express.static(path.join(__dirname , "public")));

const http = require("http");
const server = http.createServer(app);

const socketio = require("socket.io");
const io = socketio(server);



io.on("connection" , (socket) => {

    socket.on('joinchatroom' , ({username , room}) => {
        const user = joinUser(socket.id , username , room);
        socket.join(user.room); 


    socket.emit("message" , formatMessage('Chat Bot',"welcome to chatCord !"));
    socket.broadcast.to(user.room).emit("message" , formatMessage('Chat Bot',`${user.username} has join the chat !`) );
  

     

    })

     // listen for the emited chatMessage from clients 
     socket.on("chatMessage" , msg => {
      const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message" , formatMessage(user.username,msg));
    })
    socket.on("disconnect" , () => {
        const user = userLeave(socket.id)
        if (user){
            io.to(user.room).emit("message" ,formatMessage('Chat Bot',`${user.username} has left the chat !`));
        }
    })
    
    
});


server.listen(Port , () => {
    console.log(` App running on Port ${Port}`);
});