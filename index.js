const httpFunction = async (req, res) => {
  res.send('Hello, World');
};

const backgroundFunction = async (event, context) => {
  console.log('Hello, World');
};

module.exports = {
  httpFunction,
  backgroundFunction,
};
