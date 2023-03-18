import express from "express";
import {customAlphabet} from "nanoid";
import Url from '../url.js';
import validateUrl from '../utils/utils.js'
import dotenv from 'dotenv';
dotenv.config({path: './.env'});
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({ extended: true }));


const router = express.Router();
//shortener url generator
router.post('/api/shorturl', async (req, res) => {
    const longUrl = req.body.url_input;
    //const base = process.env.BASE;
    const nanoid = customAlphabet('0123456789',2);
    const urlId = nanoid();

    if (validateUrl(longUrl)) {
        try {
          let url = await Url.findOne({ longUrl });

          //if the database already have that url, call it
          if (url) {
            //get all properties saved
            //res.json(url);
            //get the selected properties
            res.json({"longUrl":longUrl,"shortUrl":url.shortUrl});
          
            //if there's not a url already in the database, create one
          } else {
            const shortUrl = urlId;

            url = new Url({
              longUrl,
              shortUrl,
              urlId,
              date: new Date(),
            });
    
            await url.save();
            //res.json(url);
            res.json({"longUrl":longUrl,"shortUrl":url.shortUrl});
          }
        } catch (err) {
          console.log(err);
          res.status(500).json('Server Error');
        }
      } else {
        res.status(400).json({'error:': 'invalid url'});
      }
});

export default router;