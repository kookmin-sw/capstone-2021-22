const express = require('express');
const PILLS = require('../models').PILLS;
const FAVORITES = require('../models').FAVORITES;
const multer = require('multer');
const passport = require('passport');
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const spawn = require('child_process').spawn;

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
var upload = multer({ storage: storage }).fields([{ name: 'first' }, { name: 'second' }])

// Router
router.post("/unLogged", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    const obj = JSON.parse(JSON.stringify(req.files));

    const result = spawn('python', [path.join(__dirname, '..', '..', 'AI', 'AImain', './modelmain.py'), obj.first[0].path, obj.second[0].path]);

    result.stdout.on('data', async function (data) {
      let pill_list = data.toString();


      const Arr = pill_list.split(',')

      const final = [];
      try {

        for (let i = 0; i < Arr.length - 1; i++) {
          final[i] = await PILLS.findOne({ where: { id: Arr[i] }, raw: true });
          final[i].image = await fs.readFile(__dirname + '/images' + '/' + Arr[i] + '.jpg',              //파일 읽기
            (err, data) => {

              return data;

            }

          )
          final[i].isFavorite = false;
        }
        fs.unlink(obj.first[0].path);
        fs.unlink(obj.second[0].path);
        res.json(final);
      } catch (error){
        console.error(error);
        return next(error);
      }
    });

    result.stderr.on('data', function (data) {
      console.log(data.toString());
    });

  });





});

router.post("/",  passport.authenticate('jwt', { session: false }),(req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }

    const obj = JSON.parse(JSON.stringify(req.files));

    const result = spawn('python', [path.join(__dirname, '..', '..', 'AI', 'AImain', './modelmain.py'), obj.first[0].path, obj.second[0].path]);

    result.stdout.on('data', async function (data) {
      let pill_list = data.toString();


      const Arr = pill_list.split(',')

      const final = [];
      try {
        const favorites = await FAVORITES.findAll({ where: { user_id: req.user.id }, raw: true });

        const flist = []

        for (let i = 0; i < Object.keys(favorites).length; i++) {
          flist.push(favorites[i].pill_id);
        }
        for (let i = 0; i < Arr.length - 1; i++) {
          final[i] = await PILLS.findOne({ where: { id: Arr[i] }, raw: true });
          final[i].image = await fs.readFile(__dirname + '/images' + '/' + Arr[i] + '.jpg',              //파일 읽기
            (err, data) => {

              return data;

            }

          )
          final[i].isFavorite = (flist.indexOf(final[i].id) < 0) ? false : true;

        }
        fs.unlink(obj.first[0].path);
        fs.unlink(obj.second[0].path);
        res.json(final);
      } catch (error){
        console.error(error);
        return next(error);
      }
    });

    result.stderr.on('data', function (data) {
      console.log(data.toString());
    });

  });





});


module.exports = router;