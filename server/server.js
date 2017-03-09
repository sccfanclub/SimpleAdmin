/**
 * Created by cc on 27/02/2017.
 */
"use strict";

const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/simpleAdmin');
const ItemSchema = new mongoose.Schema({
  project:String,
    link:{
      url: String,
      name: String}

});

const Item = mongoose.model('item', ItemSchema);
// var item_1 = new item({link: 'http://www.baidu.com', name: 'baidu'});
// console.log(item_1.name);
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json({}));

app.post('/add', (req, res, next) => {
  // console.log("req.body: " + req.body["link"] + JSON.stringify(req.body, null, 4) + "\n");
  Item.create({
    project: req.body.project,
    link:
        {   name: req.body.name,
            url: req.body.url
        }
  })
    .then(_ => res.json({ok: true}));
});

app.get('/get', (req, res, next) => {
    // console.log("req.body: " + req.body["link"] + JSON.stringify(req.body, null, 4) + "\n");
    Item.find({}, (err, item) =>{
      if (err) {
        alert(err)
      }
      res.status(200).json(item)})
});


app.listen(3001);
