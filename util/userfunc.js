const users = [] 

// join user to chat : 

function joinUser(id,username , room){
    const user = {
        id ,
        username , 
        room
    }
    users.push(user);
    return user;
}

// get current user : 

function getCurrentUser(id){
    return users.find(user => user.id === id);
}

function userLeave(id){
    const index = users.findIndex( user =>  user.id === id);
    if (index !== -1){
        return users.splice(index,1)[0];
    }
}

// get user room : 
function getUserRoom(id){
    return users.filter(user => user.id === id);
}


module.exports = {joinUser , getCurrentUser ,userLeave,getUserRoom}