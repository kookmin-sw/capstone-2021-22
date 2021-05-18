const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const spawn = require('child_process').spawn;



router.post('/', async (req, res) => {

    const { pillId } = req.body;

    const result = spawn('python', [__dirname + '/crawler/crawl.py', pillId]);




    try {

        const pillInfo = await PILLS.findOne({ where: { id: pillId }, raw: true });

        pillInfo.image = await fs.readFile(__dirname + '/images' + '/' + pillId + '.jpg',              //파일 읽기
            (err, data) => {

                return data;

            }
        )

       
        
        res.json(pillInfo);


    }
    catch (error) {
        console.error(error);
        done(error);
    }


});

router.post('/code', async (req, res) => {

    const { pillId } = req.body;

    const result = spawn('python', [__dirname + '/crawler/crawl.py', pillId]);




    try {

        

        
        result.stdout.on('data', function (data) {
            data.toString();
            res.write(data);
            res.end();
         });
        
       


    }
    catch (error) {
        console.error(error);
        done(error);
    }


});




module.exports = router;
