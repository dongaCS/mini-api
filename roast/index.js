const express = require(`express`);
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// get request for a roast
app.get("/api/roast", (req, res) => {
    res.send("hello world")
})


app.listen(process.env.PORT, () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGODB_URI) // connects 
        .then(() => {
            console.log("MONGODB CONNECTED"); // when connected, let us know
        })
        .catch((e) => { // print error
            console.log(e);
        });

    console.log(`roast api listening to ${process.env.PORT}`)
})