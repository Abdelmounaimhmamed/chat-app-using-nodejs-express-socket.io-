const moment = require("moment");


function formatedMessage(userName , text){
    return {
        userName : userName,
        text : text,
        time : moment().format("h:mm a")
    };
}

module.exports = formatedMessage ;