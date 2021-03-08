const express = require('express');

const baseRouter = require('./routers/baseRouter');

const app = express();

app.set('port', process.env.PORT || 8003);
app.use(express.json());

app.listen(app.get('port'),() =>{
    console.log(app.get('port'),"port waiting");
});