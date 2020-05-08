const router = require('express').Router();
const List = require('../models/listTitles.model');
const _ = require("lodash");

router.route('/:listTitle').get((req, res) => {
    const customTitle = _.capitalize(req.params.listTitle);

    List.findOne({title: customTitle}, (err, foudList) => {
        if(!err){
            if(!foudList){
                const list = new List({
                    title: customTitle,
                    items: [{name: "Default Item"}]
                });
                list.save();
                res.redirect('/' + customTitle);
            } else{
                res.render("list", {listTitle: foudList.title , newListItems: foudList.items});
            }
        }
    });

    
});


module.exports = router;