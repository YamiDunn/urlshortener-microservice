import express from 'express';
import connectDB from './server.js';
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

//Connect to the data base
connectDB();

import uIndexRouter from './routes/uIndex.js';
import urlsRouter from './routes/urls.js';


//corst and static app route
app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

/*//body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/', uIndexRouter);
app.use('/', urlsRouter);

// Listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

/*app.route('/api/shorturl')
.get((req,res) => {
  res.json({requestBody:req.body});
});*/

