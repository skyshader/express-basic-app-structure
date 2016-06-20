const server = require('./../server/init');
global.request = require('supertest');
global.chai = require('chai');
global.assert = chai.assert;

const port = 3001;

global.app = server.listen(port);
global.api_url = '/api/v1';
