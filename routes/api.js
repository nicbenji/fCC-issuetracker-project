'use strict';

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(function(req, res) {
      const project = req.params.project;
      const filters = req.query;

      try {
      } catch (error) {
      }

    })

    .post(function(req, res) {
      const project = req.params.project;
      const issue = req.body;

      try {
      } catch (error) {
      }
    })

    .put(function(req, res) {
      const project = req.params.project;
      const updateFields = req.body;
      const id = updateFields._id;

      if (!id) {
        return res.json({ error: 'missing _id' });
      }

      try {
      } catch (error) {
      }
    })

    .delete(function(req, res) {
      const project = req.params.project;
      const id = req.body._id;
      if (!id) {
        return res.json({ error: 'missing _id' });
      }

      try {
      } catch (error) {
      }
    });

};
