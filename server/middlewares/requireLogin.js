// This can be used in every route, when specified in index.js or in certain routes only

module.exports = (req, res, next) => { // next for "next middleware" in the chain
  if (!req.user) {
    return res.status(401).send({ error: 'You muist log in'});
  }
  
  next();
};
