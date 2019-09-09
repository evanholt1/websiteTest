// NPM imports
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// File imports
const userRouter = require('./routes/userRoutes');
const subjectRouter = require('./routes/subjectRoutes');
// const groupRouter = require('./routes/groupRoutes');
// const postRouter = require('./routes/postRoutes');

mongoose.connect(process.env.MONGO_CONNECTION,{useNewUrlParser:true});
mongoose.set('useCreateIndex', true);

const app = express();

app.use(express.json());

var store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION,
  collection: 'sessions'
});

app.use(session({
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:false,
  store:store,
  rolling:true,
  cookie: {
    maxAge:1000 * 60 * 5
  }
}));

app.use('/users',userRouter);
app.use('/subjects',subjectRouter);
// app.use('/posts',postRouter);
// app.use('/groups',groupRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));