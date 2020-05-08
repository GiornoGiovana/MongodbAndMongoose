const mongoose = require('mongoose');


const listSchema = {
    title: String,
    items: [{name: String}]
};

const List = mongoose.model('List', listSchema);

module.exports = List;
