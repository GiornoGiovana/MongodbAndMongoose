const router = require('express').Router();
let Item = require('../models/item.model');


router.route('/').get((req, res) => {
    
    Item.find().then(items => {
        res.render("list", {listTitle: "Today", newListItems: items})
    });
 
});

router.route('/').post((req, res) => {
    const itemValue = req.body.newItem;

    const newItem = new Item({name: itemValue});
    newItem.save()
    .then(() => console.log("Successfully added"));

    res.redirect('/');
});

router.route('/delete').post((req, res) => {
    const checkedIt = req.body.checkbox;
    Item.findByIdAndRemove({_id: checkedIt}, (err) => {
        if(!err){
            console.log("Successfully delete!");
        }
        res.redirect('/');
    })
    
})



module.exports = router;