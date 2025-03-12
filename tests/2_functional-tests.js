const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Testing /api/issues/{project}
suite('Functional Tests', function() {

  test('POST should create the correct issue if every field is set', (done) => {
    const testIssue = {
      issue_title: 'testEvery',
      issue_text: 'Test of filling every field',
      created_by: 'TestUser',
      assigned_to: 'TestUser',
      status_test: 'New'
    }

    chai.request(server)
      .post('/api/issues/test')
      .send(testIssue)
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body, testIssue);
        done();
      });

  });

  test('POST should create the correct issue if only required fields are set', (done) => {
    const testIssue = {
      issue_title: 'testRequired',
      issue_text: 'Test for required fields',
      created_by: 'TestUser'
    }

    chai.request(server)
      .post('/api/issues/test')
      .send(testIssue)
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body, testIssue);
        done();
      });
  });

  test('POST should return an error if missing required fields', (done) => {
    const testIssue = {
      issue_title: 'Test for required error',
      created_by: 'TestUser',
      status_text: 'New'
    }

    chai.request(server)
      .post('/api/issues/test')
      .send(testIssue)
      .end((_err, res) => {
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'required field(s) missing' });
        done();
      });
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
