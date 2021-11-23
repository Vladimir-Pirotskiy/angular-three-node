const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
let database;
const DB_CUBE_STATE = "state";
const app = express();
const PORT = 3000;
const LOCAL_DATABASE = "mongodb://localhost:27017/app";
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
     {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        if (error) {console.log(error);process.exit(1);}

        database = client.db('mydb');
        console.log("Database connection done.");
        const server = app.listen(process.env.PORT || PORT, function () {
            const port = server.address().port;
            console.log("App now running on port", port);
        });
    });

app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

app.get('/api/load-state', (req, res) => {
    database.collection(DB_CUBE_STATE).find({}).toArray(function (error, data) {
        if (error) {
            manageError(res, err.message, "Failed to get contacts.");
        } else {
            res.status(200).json(data[data.length-1]);
        }
    });
});

app.post('/api/save-state', (req, res) => {
    database.collection(DB_CUBE_STATE).insertOne(req.body, function (err, doc) {
        if (err) {
            manageError(res, err.message, "Failed to create new product.");
        } else {
            res.status(201).json(doc);
        }
    });
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}



