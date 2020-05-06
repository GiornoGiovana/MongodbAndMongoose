//use template with EJS install ejs with npm

const express = require("express");
const bodyParse = require("body-parser");

const app = express();

let items = ['Just 4 fun']; //ise always let instend of var because of the scope !!!!REMEMBER IT DOG!!!!!
let workItems = [];

app.set('view engine', 'ejs'); //in order to use ejs, create a folder call views and inside put the template

app.use(bodyParse.urlencoded({ extended: true}));//in order to get access the input of the user
app.use(express.static("public"));

app.get('/', (req, res) => {
    
    let event = new Date();
    const options = { weekday: 'long', month:'long', day: 'numeric' };
    let date = event.toLocaleDateString('en-US', options);

    res.render('list', {listTitle: date, newListItems : items}); //dogsName is the varible of the template and pass the value
    
});

app.post('/', (req, res) => { //get the input by a post and REMEMBER use de req(require).body.{input name}
    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }

});

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newListItems: workItems});
})




app.listen(3000, function(){
    console.log("Server started on port 3000");
});