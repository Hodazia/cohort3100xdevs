"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config();
function connectWithUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        // Example PostgreSQL connection URL
        // Replace with your actual database URL
        const connectionUrl = process.env.DATABASE_URL;
        ;
        const client = new pg_1.Client({
            connectionString: connectionUrl, // Pass the URL here
            // You can also add other options like ssl if needed
            // ssl: {
            //     rejectUnauthorized: false // Use this carefully, only for dev/test
            // }
        });
        console.log("connection string is ", connectionUrl);
        try {
            yield client.connect();
            console.log('Connected to PostgreSQL using connection URL!');
            const query = `
        INSERT INTO table1(first,age) VALUES($1, $2)`;
            const fname = 'lei hong';
            const agen = 19;
            const result = yield client.query(query, [fname, agen]);
            console.log(result);
        }
        catch (err) {
            console.error('Error connecting or querying database:', err);
        }
        finally {
            yield client.end();
            console.log('Disconnected.');
        }
    });
}
//connectWithUrl();
function getonfirst() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionUrl = process.env.DATABASE_URL;
        console.log("connection string is ", connectionUrl);
        const client = new pg_1.Client({
            connectionString: connectionUrl, // Pass the URL here
        });
        try {
            yield client.connect();
            const query = `SELECT first from table1`;
            const result = yield client.query(query);
            return result;
        }
        catch (e) {
            return 'Error connecting to ';
        }
    });
}
function entercredentials(firstname, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionUrl = process.env.DATABASE_URL;
        const client = new pg_1.Client({
            connectionString: connectionUrl, // Pass the URL here
        });
        try {
            const z = yield client.connect();
            const query = `INSERT INTO table1(first,age) VALUES($1,$2)`;
            const result = yield client.query(query, [firstname, age]);
            return true;
        }
        catch (e) {
            return false;
        }
    });
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json("hey u are in alls good");
    //@ts-ignore
    const result = yield getonfirst();
    //@ts-ignore
    console.log(result.rows[0]);
}));
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, age } = req.body;
    const output = yield entercredentials(firstname, age);
    if (output) {
        res.json({ message: "Successfully entered the data" });
    }
    else {
        res.json({ message: "problem sending in the data" });
    }
}));
app.listen(3000, () => {
    console.log("hey u are connected !");
});
