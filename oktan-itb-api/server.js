require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');


const db = require("./src/models");
const { errorHandler } = require('./src/middlewares/errorHandler');
const ApiRouter = require('./src/routes');
const corsOptions = require('./src/configs/corsOptions');
const credentials = require('./src/middlewares/credentials');
const { __BASEDIR } = require('./src/configs/config');




const app = express();


app.use(credentials)
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initDatabase()

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/v1/', ApiRouter)

app.use(errorHandler)


app.listen(8000);

