const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

// Testing /api/issues/{project}
suite('Functional Tests', function() {

  const testFull = {
    issue_title: 'testEvery',
    issue_text: 'Test of filling every field',
    created_by: 'TestUser',
    assigned_to: 'TestUser',
    status_test: 'New'
  }

  const testRequired = {
    issue_title: 'testRequired',
    issue_text: 'Test for required fields',
    created_by: 'TestUser'
  }

  function arrayIncludesObj(array, obj) {
    return array.some((item) => assert.deepEqual(item, obj));
  }

  test('POST should create the correct issue if every field is set', (done) => {

    chai.request(server)
      .post('/api/issues/test')
      .send(testFull)
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body, testFull);
        done();
      });

  });

  test('POST should create the correct issue if only required fields are set', (done) => {

    chai.request(server)
      .post('/api/issues/test')
      .send(testRequired)
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body, testRequired);
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
    chai.request(server)
      .get('/api/issues/test')
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isTrue(arrayIncludesObj(res.body, testFull));
        assert.isTrue(arrayIncludesObj(res.body, testRequired))
        done();
      });
  });

  test('GET should return all issues that fulfill one filter criteria', (done) => {
    chai.request(server)
      .get("/api/issues/test?assigned_to='TestUser'")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isTrue(arrayIncludesObj(res.body, testFull));
        done();
      });

  });

  test('GET should return all issues that fulfill all filter criteria', (done) => {
    chai.request(server)
      .get("/api/issues/test?created_by='TestUser'&issue_title='testRequired'")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.isTrue(arrayIncludesObj(res.body, testRequired));
        done();
      });

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
