const express = require('express');

const multer = require('multer');
const passport = require('passport');
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname+"/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
 });
 var upload = multer({ storage: storage }).fields([{name:'first'},{name:'second'}])
 
 // Router
 router.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    console.log(req.files);
    const obj = JSON.parse(JSON.stringify(req.files));
    console.log(obj.first[0].fieldname);
    return res.json({
      success: true,
      image: res.req.files.fisrt,
      fileName: res.req.files,
    });
  });
 });
 
 
 module.exports = router;