const escapeHtml = require('escape-html');

const httpFunction = async (req, res) => {
  res
      .status(200)
      .send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
};

const backgroundFunction = async (event, context) => {
  console.log('Hello, World');
};

module.exports = {
  httpFunction,
  backgroundFunction,
};
