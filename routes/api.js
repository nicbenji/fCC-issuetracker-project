'use strict';

module.exports = function(app) {

  app.route('/api/issues/:project')

    .get(function(req, res) {
      const project = req.params.project;
      const filters = req.query;

    })

    .post(function(req, res) {
      const project = req.params.project;

    })

    .put(function(req, res) {
      const project = req.params.project;

    })

    .delete(function(req, res) {
      const project = req.params.project;

    });

};
