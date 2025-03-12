const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Testing /api/issues/{project}
suite('Functional Tests', function() {

  test('POST should create the correct issue if every field is set', (done) => {

  });

  test('POST should create the correct issue if only required fields are set', (done) => {

  });

  test('POST should return an error if missing required fields', (done) => {

  });

  test('GET should return all issues of a project', (done) => {

  });

  test('GET should return all issues that fulfill one filter criteria', (done) => {

  });

  test('GET should return all issues that fulfill all filter criteria', (done) => {

  });

  test('PUT should update one specified field', (done) => {

  });

  test('PUT should update all specified fields', (done) => {

  });

  test('PUT should return an error on missing _id', (done) => {

  });

  test('PUT should return an error if no fields are specified', (done) => {

  });

  test('PUT should return an error on an invalid _id', (done) => {

  });

  test('DELETE should delete the specified project', (done) => {

  });

  test('DELETE should return an error on an invalid _id', (done) => {

  });

  test('DELETE should return an error on missing _id', (done) => {

  });

});
