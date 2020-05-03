const uuid = require('uuid');
const {backgroundFunction} = require('..');

jest.mock('@google-cloud/pubsub');
const {mockPublishJson} = require('@google-cloud/pubsub');

it('background function shall contain what we sent', async ()=>{
  const name = uuid.v4();
  const topic = uuid.v4();
  const config = {
    'name': name,
    'topic': topic,
  };
  const context = {
    'subscription': 'projects/test/subscriptions/test_subscription',
    'message': {
      'data': buffer64(config),
      'messageId': '1',
      'attributes': {},
    },
  };
  await backgroundFunction(undefined, context);
  expect(mockPublishJson).toHaveBeenCalled();
  expect(mockPublishJson).toBeCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(name),
      }),
  );
});

const buffer64 = (obj) => {
  const objJsonStr = JSON.stringify(obj);
  return Buffer.from(objJsonStr).toString('base64');
};

