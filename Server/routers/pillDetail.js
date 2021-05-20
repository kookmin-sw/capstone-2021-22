const express = require('express');
const passport = require('passport');
const PILLS = require('../models').PILLS;
const FAVORITES = require('../models').FAVORITES;
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const spawn = require('child_process').spawn;
const request = require('request');
require('dotenv').config();
const convert = require('xml-js');

const url = 'http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList';

let queryParams = '?' + encodeURIComponent('ServiceKey') + '='+process.env.API_KEY;

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

    const { pillId } = req.body;

    const result = spawn('python', [__dirname + '/crawler/crawl.py', pillId]);




    try {
        const favorites =  await FAVORITES.findAll({where : {  user_id:req.user.id  }, raw: true} );

        const flist = []
    
        for(let i = 0;i<Object.keys(favorites).length;i++){
            flist.push(favorites[i].pill_id);
        }
        
        const pillInfo = await PILLS.findOne({ where: { id: pillId }, raw: true });

        pillInfo.image = await fs.readFile(__dirname + '/images' + '/' + pillId + '.jpg',              //파일 읽기
            (err, data) => {

                return data;

            }
        )

        pillInfo.isFavorite = (flist.indexOf(pillInfo.id) < 0) ? false : true;
        res.json(pillInfo);


    }
    catch (error) {
        console.error(error);
        done(error);
    }


});

router.post('/code', async (req, res) => {

    const { pillId } = req.body;

    // const result = spawn('python', [__dirname + '/crawler/crawl.py', pillId]);




    try {

        

        
        // result.stdout.on('data', function (data) {
        //     data.toString();
        //     res.write(data);
        //     res.end();
        //  });
        queryParams += '&' + encodeURIComponent('itemSeq') + '=' + encodeURIComponent(pillId); 

        request({
            url: url + queryParams,
            method: 'GET'
        }, function (error, response, body) {
            const xmlToJson = convert.xml2json(body, {compact: true, spaces: 4});
            
            res.send(xmlToJson);
        });
       


    }
    catch (error) {
        console.error(error);
        done(error);
    }


});




module.exports = router;
