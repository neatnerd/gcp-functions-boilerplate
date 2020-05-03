const uuid = require('uuid');
const fs = require('fs');
const {Response} = require('jest-express/lib/response');
const {Request} = require('jest-express/lib/request');
const {httpSideEffectFunction} = require('..');
const fileName = 'log.txt';

const cleanup = () =>{
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }
};

beforeEach(()=>{
  cleanup();
});

afterEach(()=>{
  cleanup();
});

it('should write to the file', async () => {
  const name = uuid.v4();
  // GCP Cloud Functions use Express API
  const req = new Request();
  req.setBody({name: name});
  const res = new Response();
  await httpSideEffectFunction(req, res);
  const fileContent = await fs.promises.readFile(fileName);
  const resString = fileContent.toString();
  expect(resString.split(/\r\n|\r|\n/).length).toEqual(2);
  expect(resString).toContain(name);
});
