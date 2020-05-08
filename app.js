//use template with EJS install ejs with npm
const express = require("express");
const cors = require("cors");
const bodyParse = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs'); //in order to use ejs, create a folder call views and inside put the template

app.use(bodyParse.urlencoded({ extended: true}));//in order to get access the input of the user
app.use(express.static("public"));

const uri = process.env.ATLAS_URI; //get from mongodb
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
})

const itemsRouter = require('./routes/items');
const listsRouter = require('./routes/lists');

app.use('/', itemsRouter);
app.use('/', listsRouter);

app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});
