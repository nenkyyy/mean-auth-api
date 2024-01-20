/** 
 * @description global scope 
 * */
const jwt = require('jsonwebtoken');

/** 
 * @description schemas 
 * */
const Account = require('../schemas/account');

/** 
 * @desription authorization 
 * */
const authorize = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).send({ error: 'Authorization required.' });

  let account = await Account.findOne({ tokenCollection: { $in: token } });
  if (!account) return res.status(401).send({ error: 'Account required.' });

  jwt.verify(token, account['password'], async (error, decoded) => {
    if (error) return res.status(401).send({ error: 'Credentials mismatch.' });

    if (!account['_id'].equals(decoded['account']))
      return res.status(401).send({ error: 'Authorization required.' });

    next();
  });
};

module.exports = authorize;