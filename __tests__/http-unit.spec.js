const uuid = require('uuid');
const {Response} = require('jest-express/lib/response');
const {Request} = require('jest-express/lib/request');
const {httpFunction} = require('..');

it('http function shall contain what we sent', async () => {
  const name = uuid.v4();
  // GCP Cloud Functions use Express API
  const req = new Request();
  req.setBody({name: name});
  const res = new Response();
  await httpFunction(req, res);
  expect(res.send).toHaveBeenCalled();
  expect(res.send.mock.calls[0][0]).toContain(name);
});
