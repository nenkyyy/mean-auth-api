/** 
 * @description global scope 
 * */
const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorization');

/** 
 * @description schema 
 * */
const Artist = require('../schemas/artist');

/** 
 * @description create artist
 * */
router.post('/create', authorize, async (req, res, next) => {
  try {
    const payload = req['body'];

    let artist = await Artist.findOne({ email: payload['email'] });
    if (artist) return res.status(200).send({ error: 'Artist already exists.' });

    artist = await Artist.create({ ...payload });

    return res.status(200).send(artist);
  } catch (error) { return res.status(500).send(); }
});

module.exports = router;