import WebSocket, { WebSocketServer } from 'ws';

// 
const wss = new WebSocketServer({ port: 8080 });

// how many user are connected
let userCount = 0;

interface User  {
    socket:WebSocket,
    roomId:string
}
let allSockets : User[] = []; // global allSockets array, whenever a user is connected to ws, its socket gets pushed to the allSockets



/*
whenver a connection is made to ws, call the callback function and give the callback function a socket
 */

/**
 we need to do something called as broadcast, 
 now, u can go to hoppscotch.io where u can do API testing like POSTMAN, now make connection to ws from that also, 

 What we will be building is create a room, where only those room memebers will be there who are connected,
 Always send the message in string,


 */
wss.on("connection" , (socket) => {
    // now when someone tells u they want to be a part of some room, u then push it to allSockets
    //allSockets.push(socket)
    //userCount = userCount + 1;
    //console.log(`user connected ${userCount}`);

    socket.on("message", (message) => {
        // what if u want to send message after 1 second, u can do so via setTimeOut()
        /*allSockets.forEach(s => {
            s.send(message.toString()  + ": sent from the server");
        }) */

        // first parse the string message into json
        const parsedMessage = JSON.parse(message as unknown as string);
        if(parsedMessage.type == "join")
        {
            console.log("user joined the room " + parsedMessage.payload.roomId);
            allSockets.push({
                socket,
                roomId:parsedMessage.payload.roomId
            })
        }

        if(parsedMessage.type == "chat")
        {
            // find all the users which belong to this roomId, but before that find the current user room id,
            let currentUSerRoom = null;
            for (let i=0;i<allSockets.length; i++)
            {
                if(allSockets[i].socket == socket)
                {
                    currentUSerRoom = allSockets[i].roomId
                }
            }
            for(let i=0;i<allSockets.length;i++)
                {
                    if(allSockets[i].roomId == currentUSerRoom)
                    {
                        allSockets[i].socket.send("the message sent is " + parsedMessage.payload.message);
                    }
                }


        }
        /*for(let i=0;i<allSockets.length;i++)
        {
            const s = allSockets[i];
            s.send("message received is " + message.toString() + " from the server")
        }*/
    })

})




