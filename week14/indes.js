"use strict";
/*problem - 1
function sayhello(name:String){
    console.log(`Hello ${name}`);
}

sayhello("Zia");
*/
function sayhi() {
    console.log("hello after 1s");
}
function newhi() {
    console.log("GREETINGS");
    setTimeout(sayhi, 1000);
}

newhi();