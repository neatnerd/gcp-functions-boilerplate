const escapeHtml = require('escape-html');

const httpFunction = async (req, res) => {
  res
      .status(200)
      .send(`Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!`);
};

const httpSideEffectFunction = async (req, res) =>{
  const fs = require('fs');
  const value = escapeHtml(req.query.name || req.body.name || 'World');
  const line = `Hello ${value}!\n`;
  try {
    await fs.promises.appendFile('log.txt', line);
  } catch (error) {
    res.status(503).send('could not write to a file').end();
    return;
  }
  res.status(200).send('wrote file');
};

const backgroundFunction = async (event, context) => {
  const data = getDataFromEvent(event, context);
  const {PubSub} = require('@google-cloud/pubsub');
  const pubSubClient = new PubSub();
  const publisher = pubSubClient.topic(data.topic);
  publisher.publishJSON({
    message: `Hello ${data.name || 'World'}!`,
  });
};


const getDataFromEvent = (event, context) => {
  let data = undefined;
  if (event) {
    data = event.data;
  }
  if (!data) {
    data = context.message.data;
  }
  return JSON.parse(Buffer.from(data, 'base64').toString());
};

module.exports = {
  httpFunction,
  httpSideEffectFunction,
  backgroundFunction,
};
