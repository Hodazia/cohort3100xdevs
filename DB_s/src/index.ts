import { Client } from 'pg'
import dotenv from 'dotenv';
import express from 'express';
import { Request,Response } from 'express';
const app =express();

app.use(express.json());
dotenv.config();




async function connectWithUrl() {
    // Example PostgreSQL connection URL
    // Replace with your actual database URL
    const connectionUrl = process.env.DATABASE_URL;
;

    const client = new Client({
        connectionString: connectionUrl, // Pass the URL here
        // You can also add other options like ssl if needed
        // ssl: {
        //     rejectUnauthorized: false // Use this carefully, only for dev/test
        // }
    });
    console.log("connection string is ", connectionUrl)

    try {
        await client.connect();
        console.log('Connected to PostgreSQL using connection URL!');
        const query = `
        INSERT INTO table1(first,age) VALUES($1, $2)`;
        const fname = 'lei hong';
        const agen = 19;
        const result = await client.query(query,[fname,agen]);
        console.log(result);

    } catch (err) {
        console.error('Error connecting or querying database:', err);
    } finally {
        await client.end();
        console.log('Disconnected.');
    }
}

//connectWithUrl();



async function getonfirst()
{// Replace with your actual database URL
    const connectionUrl = process.env.DATABASE_URL;
    console.log("connection string is ", connectionUrl)
    const client = new Client({
        connectionString: connectionUrl, // Pass the URL here
    });

    try{
        await client.connect();
        const query = `SELECT first from table1`;
        const result = await client.query(query);
        return result;
    }
    catch(e)
    {
        return 'Error connecting to '
    }
}


async function entercredentials(firstname: string,age: number)
{
    const connectionUrl = process.env.DATABASE_URL
    
        const client = new Client({
            connectionString: connectionUrl, // Pass the URL here
        });
    try{
        const z= await client.connect();
        const query = `INSERT INTO table1(first,age) VALUES($1,$2)`;
        const result = await client.query(query,[firstname,age]);
        return true;
    }
    catch(e)
    {
        return false;
    }

}
app.get("/", async (req:Request,res:Response) => {
    res.json("hey u are in alls good");
    //@ts-ignore
    const result =await  getonfirst();
    //@ts-ignore
    console.log(result.rows[0]);
})

app.post("/signup", async (req,res) => {
    const {firstname,age} = req.body;
    const output = await entercredentials(firstname,age);
    if(output)
    {
        res.json({message:"Successfully entered the data"});
    }
    else{
        res.json({message:"problem sending in the data"});
    }
})


app.listen(3000, () => {
    console.log("hey u are connected !");
})