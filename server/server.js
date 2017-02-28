/**
 * Created by cc on 27/02/2017.
 */
"use strict";

const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/simpleAdmin');
const ItemSchema = new mongoose.Schema({
  link: String,
  name: String
});

const item = mongoose.model('item', ItemSchema);
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded());
app.post('/add', (req, res, next) => {
  console.log("req.bdoy: " + JSON.stringify(req.body, null, 4) + "\n");
  // item.create({name: req.body.name, link: req.body.link})
  //   .then(_ => res.json({ok: true}));
});

app.listen(3001);
