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
        return res.json({ error: error.message });
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

      try {
        await updateIssueById(id, updateFields);
        return res.json({ result: 'successfully updated', '_id': id })
      } catch (error) {
        return res.json({ error: error.message, '_id': id });
      }
    })

    .delete(async function(req, res) {
      const id = req.body._id;

      try {
        await deleteIssueById(id);
        return res.json({ result: 'successfully deleted', '_id': id })
      } catch (error) {
        return res.json({ error: error.message, '_id': id });
      }
    });

};
