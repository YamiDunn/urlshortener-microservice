import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    require: true,
  },
  longUrl: {
    type: String,
    require: true,
  },
  shortUrl: {
    type: String,
    require: true,
  },
  clicks: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

export default mongoose.model('Url', urlSchema);