'use strict';
const { getAllIssues, createIssue, updateIssueById, deleteIssueById } = require('../services/issueService');

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(async function(req, res) {
      const project = req.params.project;
      const filters = req.query;

      try {
        const issues = await getAllIssues(project, filters);
        return res.json(issues);
      } catch (error) {
        // TODO: Error handling
      }

    })

    .post(async function(req, res) {
      const project = req.params.project;
      const issue = req.body;

      try {
        const savedIssue = await createIssue(project, issue);
        return res.json(savedIssue);
      } catch (error) {
        return res.json({ error: error.message });
      }
    })

    .put(async function(req, res) {
      const updateFields = req.body;
      const id = updateFields._id;

      if (!id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        await updateIssueById(id, updateFields);
        return res.json({ result: 'successfully updated', '_id': id })
      } catch (error) {
        return res.json({ error: error.message, '_id': id });
      }
    })

    .delete(async function(req, res) {
      const id = req.body._id;

      if (!id) {
        return res.json({ error: 'missing _id' });
      }

      try {
        await deleteIssueById(id);
        return res.json({ result: 'successfully deleted', '_id': id })
      } catch (error) {
        return res.json({ error: error.message, '_id': id });
      }
    });

};
