const bundleLoader = require('../bundleLoader.js');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const clientBundles = '../public/services';
const serverBundles = '../templates/services';
const serviceConfig = require('../service-config.json');
const cssPath = '../public/style.css';
const services = require('../bundleLoader.js')(clientBundles, serverBundles, serviceConfig);

test('returns an object with services', () => {
  var testObj = {"app": "http://localhost:1337/app"};
  expect(services).toEqual(testObj);
});

// jest.mock('node-fetch');
// jest.mock('fs');
// services.forEach((service) => {
//   jest.mock(path.join(__dirname, `${serverPath}${service.name}.js`), () => ({ default: {} }), { virtual: true });
// });

// beforeAll(() => bundleLoader(clientPath, serverPath, cssPath));

// test('creates client file', () => {
//   services.forEach((service) => {
//     const clientFile = path.join(__dirname, `${clientPath}${service.name}.js`);
//     expect(fs.mockWritten(clientFile)).toBe(fetch.clientText);
//   });
// });

// test('creates server file', () => {
//   services.forEach((service) => {
//     const clientFile = path.join(__dirname, `${serverPath}${service.name}.js`);
//     expect(fs.mockWritten(clientFile)).toBe(fetch.serverText);
//   });
// });

// test('creates css file', () => {
//   services.forEach((service) => {
//     const clientFile = path.join(__dirname, `${cssPath}${service.name}.css`);
//     expect(fs.mockWritten(clientFile)).toBe(fetch.cssText);
//   });
// });