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




global.__basedir = __dirname
const app = express();

app.use(credentials)
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.initDatabase()

app.use('/public', express.static(path.join(__dirname, '/public')))
// app.use('/v1', require('./src/routes/auth.routes'))
// app.use('/v1/users', require('./src/routes/user.routes'))
// app.use('/v1/members', require('./src/routes/member.routes'))
// app.use('/v1/', require('./src/routes/invoice.routes'))
// app.use('/v1/moderators', require('./src/routes/moderator.routes'))
// app.use('/v1/competitions', require('./src/routes/competition.routes'))

app.use('/v1/', ApiRouter)

app.use(errorHandler)


app.listen(8000);

