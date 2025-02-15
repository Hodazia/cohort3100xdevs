const express = require('express');

const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomziaulhoda";
/* TOKEN AUTHENTICATION
create two routes =  
- create an empty array users, it stores the username, password and token, (we will come to where this token is created later)
- whenever the user comes in signup, we will parse the username and password and store it in the users array,push it into the array,
- create a function called generateToken which randomly generates string token.
- when u hit signin endpoint, in the most recent signin the token that will be sent, 
- 

*/

app.use(express.json());
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}


const users = [];
app.post("/signup", function(req,res) {

    //you can add input validation if u want, 
    const username = req.body.username;
    const password = req.body.password;


    users.push({
        username,
        password
    });

    res.send({
        message: "You are signed in",
    })
});


app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    /*among all the users find the user who follows the specified condition
    a function which takes a user as an input, if user.username=== username && user.password === password,

e.g.
    letfounduser = null;
    for(let i=0; i<users.length; i++)
    {
        if( users[i].username == username && users[i].password == password)
        {
            foundUser = user[i];
        } 
    }

    the same logic is written below, 

    */
    const user = users.find(user => user.username === username && user.password === password);

    /*if u find the user, then generate a token,  */
    if (user) {
        const token = jwt.sign({
            username:username
        }, JWT_SECRET);

        // it is a stateless token, token has the username encoded inside,  
        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

// if u visit localhost:3000/ then the content will be send from the backend only, 
app.get('/', function(req,res) {
    res.sendFile(__dirname + "/public/index.html");
})

/*after you signed in, the endpoint shall return the user with their information

I signed in 100xdevs, i get my own token, and if u go to mycourses endpoint, then u are returned with ur courses
*/


function auth(req,res,next)
{
    const token =req.headers.token;
    const decodedDate = jwt.verify(token,JWT_SECRET);

    // req object = {status, headers, ....};
    if (decodedDate.username)
    {
        req.username = decodedDate.username  // send the decodedData in the req object, which will be the same in auther handlers/endpoints
        next();
    }
    else{
        res.send({message:"error,no username found"});
    }
}
app.get("/me", auth ,(req, res) => {

    let foundUser = null;
    for(let i=0; i<users.length; i++)
    {
        if( users[i].username == req.username)
        {
            foundUser = users[i];
        } 
    }

    if (foundUser) {
        res.send({
            username: foundUser.username,
            password: foundUser.password
        })
    } 

})

app.listen(3000);