const router = require('express').Router();
let Item = require('../models/item.model');
const List = require('../models/listTitles.model')

router.route('/').get((req, res) => {
    
    Item.find().then(items => {
        res.render("list", {listTitle: "Today", newListItems: items})
    });
 
});

router.route('/').post((req, res) => {
    const itemValue = req.body.newItem;
    const listName = req.body.list;
    
    const newItem = new Item({name: itemValue});

    if (listName === 'Today'){
        newItem.save()
        .then(() => console.log("Successfully added"));
        res.redirect('/');
    } else {
        List.findOne({title: listName}, function(err, foundList){
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/"+ listName);
        })
    } 
   
});

router.route('/delete').post((req, res) => {
    const checkedIt = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
        Item.findByIdAndRemove({_id: checkedIt}, (err) => {
            if(!err){
                console.log("Successfully delete!");
            }
            res.redirect('/');
        });
    } else {
        List.findOneAndUpdate({title: listName}, {$pull: {items: {_id: checkedIt}}}, function(err,  foundList){
            if(!err){
                res.redirect("/"+ listName);
            }
        })
    }

    
    
});

module.exports = router;