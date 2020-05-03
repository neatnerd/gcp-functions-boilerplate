const mockPublishJson = jest.fn();


const mockTopic = jest.fn(()=> ({
  publishJSON: mockPublishJson,
}));

const PubSub = jest.fn().mockImplementation(() => ({
  topic: mockTopic,
}));

module.exports = {
  mockPublishJson,
  mockTopic,
  PubSub,
};


