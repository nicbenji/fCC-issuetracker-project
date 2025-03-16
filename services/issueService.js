const { default: mongoose } = require('mongoose');
const { ProjectModel, IssueModel } = require('../models/issue.js');

async function findProject(projectName) {
  try {
    const project = await ProjectModel.findOne({ name: projectName });

    return project?._id;
  } catch (error) {
    throw new Error('Unexpected error searching for project');
  }
}

async function createProject(projectName) {
  try {
    const newProject = new ProjectModel({
      name: projectName
    });
    const project = await newProject.save();
    return project._id;
  } catch (error) {
    throw new Error('Unexpected error creating project');
  }
}

async function findOrInsertProject(projectName) {

  const projectId = await findProject(projectName);

  if (!projectId) {
    return await createProject(projectName);
  }
  return projectId;
}

async function getAllIssues(project, filterOptions) {

  const projectId = await findOrInsertProject(project);

  try {
    const issues = await IssueModel.find(
      { project: projectId, ...filterOptions },
      '_id issue_title issue_text created_on updated_on created_by assigned_to open status_text'
    );
    return issues;
  } catch (error) {
    if (error instanceof mongoose.Error.DocumentNotFoundError) {
      throw new Error('Failed to find issues');
    }
    throw new Error('Unexpected error searching for issues');
  }
}

async function createIssue(project, issue) {

  const projectId = await findOrInsertProject(project);

  try {
    const saveableIssue = new IssueModel({ project: projectId, ...issue });
    const savedIssue = await saveableIssue.save();
    return {
      _id: savedIssue._id,
      issue_title: savedIssue.issue_title,
      issue_text: savedIssue.issue_text,
      created_on: savedIssue.created_on,
      updated_on: savedIssue.updated_on,
      created_by: savedIssue.created_by,
      assigned_to: savedIssue.assigned_to,
      open: savedIssue.open,
      status_text: savedIssue.status_text
    };
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      throw new Error('required field(s) missing');
    }
    throw new Error('Unexpected error creating issue');
  }
}

// NOTE: Maybe checking if issue belongs to project necessary
async function updateIssueById(id, updateOptions) {

  if (!id) {
    throw new Error('missing _id');
  }
  if (Object.keys(updateOptions).length === 1) {
    throw new Error('no update field(s) sent');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('could not update');
  }

  try {
    const result = await IssueModel.findByIdAndUpdate(
      id,
      { ...updateOptions, updated_on: Date.now() }
    );
    if (!result) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
  } catch (error) {
    throw new Error('could not update');
  }
}

// NOTE: Maybe checking if issue belongs to project necessary
async function deleteIssueById(id) {

  if (!id) {
    throw new Error('missing _id');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('could not delete');
  }

  try {
    const result = await IssueModel.findByIdAndDelete(id);
    if (!result) {
      throw new mongoose.Error.DocumentNotFoundError();
    }
  } catch (error) {
    throw new Error('could not delete');
  }
}

exports.getAllIssues = getAllIssues;
exports.createIssue = createIssue;
exports.updateIssueById = updateIssueById;
exports.deleteIssueById = deleteIssueById;
