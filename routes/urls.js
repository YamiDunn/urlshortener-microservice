import express from "express";
import {nanoid} from "nanoid";
import Url from '../url.js';
import validateUrl from '../utils/utils.js'
import dotenv from 'dotenv';
dotenv.config({path: './.env'});

const router = express.Router();
//shortener url generator
router.post('/shorturl', async (req, res) => {
    const {longUrl} = req.body;
    const base = process.env.BASE;
    const urlId = nanoid();

    if (validateUrl(longUrl)) {
        try {
          let url = await Url.findOne({ longUrl });
          if (url) {
            res.json(url);
          } else {
            const shortUrl = `${base}/${urlId}`;
    
            url = new Url({
              longUrl,
              shortUrl,
              urlId,
              date: new Date(),
            });
    
            await url.save();
            res.json(url);
          }
        } catch (err) {
          console.log(err);
          res.status(500).json('Server Error');
        }
      } else {
        res.status(400).json('Invalid Original Url, try again');
      }
});

export default router;