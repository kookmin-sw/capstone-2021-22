const express = require('express');
const session = require('express-session');

const { sequelize } = require('./models');


const baseRouter = require('./routers/baseRouter');

const app = express();

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

  app.use(express.json());
  app.use(express.urlencoded({extended:false}));
  app.use(session({
      resave:false,
      saveUninitialized:false,
      secret:'cookie',
      cookie:{
          httpOnly:true,
          secure: false,
      },
  }));

app.use('/', baseRouter);

app.set('port', process.env.PORT || 8003);
app.use(express.json());

app.listen(app.get('port'),() =>{
    console.log(app.get('port'),"port waiting");
});