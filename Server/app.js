const express = require('express');
const session = require('express-session');
const passport = require('passport');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const baseRouter = require('./routers/baseRouter');
const authRouter = require('./routers/auth');
const searchRouter = require('./routers/search');
const favoriteRouter = require('./routers/favorite');
const pillDetailRouter = require('./routers/pillDetail');


const app = express();
passportConfig();
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());


app.use('/', baseRouter);
app.use('/auth', authRouter);
app.use('/search', searchRouter);
app.use('/favorite', favoriteRouter);
app.use('/pillDetail', pillDetailRouter);

app.set('port', process.env.PORT || 8003);
app.use(express.json());

app.listen(app.get('port'), () => {
  console.log(app.get('port'), "port waiting");
});