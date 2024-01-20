/** 
 * @description global scope 
 * */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

/** 
 * @description schema 
 * */
const Account = require('../schemas/account');

/** 
 * @description app sign up 
 * */
router.post('/sign/up', async (req, res, next) => {
  try {
    const payload = req['body'];

    let account = await Account.findOne({ email: payload['email'] });
    if (account) return res.status(200).send({ error: 'Account already exists.' });

    account = await Account.findOne({ phone: payload['phone'] });
    if (account) return res.status(200).send({ error: 'Account already exists.' });

    account = await Account.create({ ...payload });

    return res.status(200).send(account);
  } catch (error) { return res.status(500).send(); }
});

/** 
 * @description app sign in 
 * */
router.post('/sign/in', async (req, res, next) => {
  try {
    const payload = req['body'];

    const account = await Account.findOne({ email: payload['email'] });
    if (!account) return res.status(200).send({ error: 'Account not found.' });

    bcrypt.compare(payload['password'], account['password'], (error, isMatch) => {
      if (!isMatch) return res.status(200).send({ error: 'Credentials mismatch.' });

      const token = jwt.sign({ account: account['_id'] }, account['password']);
      account['tokenCollection'].push(token);
      account.save();

      return res.status(200).send({ token: token });
    });
  } catch (error) { return res.status(500).send(); }
});

module.exports = router;