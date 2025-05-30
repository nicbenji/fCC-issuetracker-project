const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const ObjectId = require('mongoose').Types.ObjectId;
const server = require('../server');

chai.use(chaiHttp);

// Testing /api/issues/{project}
suite('Functional Tests', function() {

  const testIdFull = new ObjectId().toString();
  const testIdRequired = new ObjectId().toString();

  const testFull = {
    _id: testIdFull,
    issue_title: 'testEvery',
    issue_text: 'Test of filling every field',
    created_by: 'TestUser',
    assigned_to: 'TestUser',
    status_text: 'New'
  }

  const testRequired = {
    _id: testIdRequired,
    issue_title: 'testRequired',
    issue_text: 'Test for required fields',
    created_by: 'TestUser'
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
        assert.equal(res.status, 200);
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
        assert.deepInclude(res.body[0], testFull);
        assert.deepInclude(res.body[1], testRequired);
        done();
      });
  });

  test('GET should return all issues that fulfill one filter criteria', (done) => {
    chai.request(server)
      .get("/api/issues/test?assigned_to=TestUser")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body[0], testFull);
        done();
      });

  });

  test('GET should return all issues that fulfill all filter criteria', (done) => {
    chai.request(server)
      .get("/api/issues/test?created_by=TestUser&issue_title=testRequired")
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepInclude(res.body[0], testRequired);
        done();
      });

  });

  test('PUT should update one specified field', (done) => {
    const _id = testIdFull;

    chai.request(server)
      .put('/api/issues/test')
      .send({ _id, open: false })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { result: 'successfully updated', '_id': _id })
        done();
      });
  });

  test('PUT should update all specified fields', (done) => {
    const _id = testIdRequired;

    chai.request(server)
      .put('/api/issues/test')
      .send({ _id, open: false, assigned_to: 'TestUser2' })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { result: 'successfully updated', '_id': _id })
        done();
      });
  });

  test('PUT should return an error on missing _id', (done) => {
    chai.request(server)
      .put('/api/issues/test')
      .send({ status_text: 'In Progress' })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'missing _id' });
        done();
      });
  });

  test('PUT should return an error if no fields are specified', (done) => {
    const _id = testIdFull;

    chai.request(server)
      .put('/api/issues/test')
      .send({ _id })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'no update field(s) sent', '_id': _id });
        done();
      });
  });

  test('PUT should return an error on an invalid _id', (done) => {
    const _id = '%&!#+sjdfklj';

    chai.request(server)
      .put('/api/issues/test')
      .send({ _id, status_text: 'In Progress' })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'could not update', '_id': _id });
        done();
      });
  });

  test('DELETE should delete the specified issue', (done) => {
    const _id = testIdRequired;

    chai.request(server)
      .delete('/api/issues/test')
      .send({ _id })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { result: 'successfully deleted', '_id': _id })
        done();
      });
  });

  test('DELETE should return an error on an invalid _id', (done) => {
    const _id = '%&!#+sjdfklj';

    chai.request(server)
      .delete('/api/issues/test')
      .send({ _id })
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'could not delete', '_id': _id });
        done();
      });
  });

  test('DELETE should return an error on missing _id', (done) => {
    chai.request(server)
      .delete('/api/issues/test')
      .end((_err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.deepEqual(res.body, { error: 'missing _id' });
        done();
      });
  });

  after(async () => {
    await chai.request(server)
      .delete('/api/issues/test')
      .send({ _id: testIdFull });
  });

});
