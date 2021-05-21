const express = require('express');
const passport = require('passport');
const { promises: fs } = require("fs");
const router = express.Router();
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.post('/',  async (req, res) => {

    



    try {
       

        console.log(req);

    }
    catch (error) {
        console.error(error);
        done(error);
    }


});


module.exports = router;
