# Roast Api
![Node_v20.14.0](https://img.shields.io/badge/Node_v20.14.0-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-%23404d59?logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-lightgreen?logo=mongodb)

Couldn't find an api that returns roast so I made one... [API](https://mini-api-roast.onrender.com/api/roast). Just hit the url and a response will be send back.

## Table of Contents
- [Expected Results](#Expected-Results)
- [Setup](#Setup)
- [Adding Mongoose](#Adding-Mongoose)
- [Deploy](Deploy-on-Render-as-WS)
  
## Expected Results
### Success
```JSON
{   
    "status":200,
    "roast":"If ignorance is bliss, you must be the happiest person alive."
}
```
### Failure
```JSON
{
    "status":400,
    "payload":"failure"
}
```

## Setup
- npm init -y
- npm i express dotenv mongoose

**index.js**
```Javascript
const express = require(`express`); // importing express
require("dotenv").config(); // allows reading of .env file

const app = express();

// http://localhost:PORT/ replace port whatever PORT value is in from .env
app.get("/", (request, response) => {
    response.send("Hello World") // displays Hello World at said port
})

// launches the server
app.listen(process.env.PORT, () => console.log(`roast api listening to ${process.env.PORT}`))
```
**.env** example
```
PORT=3000
```

## Adding Mongoose
add to **index.js**
```Javascript
const mongoose = require("mongoose"); // importing mongoose

// making schema for model
const roastSchema = new mongoose.Schema(
    {
        joke: {
            type: String,
            require: true,
        }
    }
);

// making model call "Roast" in mongoose db using layout of roastSchema
const Roast = mongoose.model("Roast", roastSchema)

// http://localhost:PORT/api/roast to get a roast
app.get("/api/roast", async (req, res) => {
    let random = await Roast.aggregate().sample(1) // grabs one random roast
    res.json({status: 200, roast: random[0].roast}); // sends as a json
})

// setting up and connecting to database
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI) // connects to database
    .then(() => {
        console.log("MONGODB CONNECTED"); // when connected, let us know
    })
    .catch((e) => { // print error
        console.log(e);
    });
```

## Deploy on Render as WS
| Type | Input |
| --- | --- |
| Language | Node |
| Branch | main |
| Root Directory | roast |
| Build Command | npm install |
| Start Command | node index.js |
