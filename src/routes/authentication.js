const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Account = require('../schemas/account');

router.post('/sign/up', async (request, response, next) => {
  try {
    let payload = request['body'];

    let account = await Account.findOne({ email: payload['email'] });
    if (account) return response.status(200).send({ error: 'Account already exists.' });
    account = await Account.findOne({ phone: payload['phone'] });
    if (account) return response.status(200).send({ error: 'Account already exists.' });

    account = await Account.create({ ...payload });
    return response.status(200).send(account);
  } catch (error) { return response.status(500).send(); }
});

router.post('/sign/in', async (request, response, next) => {
  try {
    let payload = request['body'];

    let account = await Account.findOne({ email: payload['email'] });
    if (!account) return response.status(200).send({ error: 'Account not found.' });

    bcrypt.compare(payload['password'], account['password'], (error, isMatch) => {
      if (!isMatch) return response.status(200).send({ error: 'Credentials mismatch.' });

      let token = jwt.sign({ account: account['_id'] }, account['password']);
      account['tokenCollection'].push(token);
      account.save();

      return response.status(200).send({ token: token });
    });
  } catch (error) { return response.status(500).send(); }
});

module.exports = router;