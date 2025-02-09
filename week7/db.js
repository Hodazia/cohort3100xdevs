/* put all the DB logic in the DB files */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const objectId = mongoose.objectId;
/* now define the schema , why we are defining the schema, when initially it is schema less
to define the schema, you have a class called schema, 


*/

const User = new Schema({
    email:String,
    password:String,
    name:String
})

const Todo = new Schema({
    title:String,
    done:Boolean,
    userId:objectId,
})

/*now after writing the schema, you need a data model, these data where do you want to store the data in which collection,
what schema should be stored in which collection*/

const UserModel = mongoose.model('users', User); // users is the collection name and User is the data schema that will be stored in that collection
const TodoModel = mongoose.model('todos', Todo);

/*we will have to export, exporting an object with key-value , and then you can import it in index.js file via importing */
module.exports = {
    UserModel:UserModel,
    TodoModel:TodoModel,
}
await mongoose.connect("mongodb+srv://zia23hoda:UzWx9ISI1qXw57ST@cluster00.7eniu.mongodb.net/todo");