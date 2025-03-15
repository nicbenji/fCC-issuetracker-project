const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

const Project = mongoose.model('Project', projectSchema);

const issueSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now()
  },
  updated_on: {
    type: Date,
    default: Date.now()
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String,
    default: ''
  },
  open: {
    type: Boolean,
    default: true
  },
  status_text: {
    type: String,
    default: 'New'
  }
});

const Issue = mongoose.model('Issue', issueSchema);

exports.ProjectModel = Project;
exports.IssueModel = Issue;
