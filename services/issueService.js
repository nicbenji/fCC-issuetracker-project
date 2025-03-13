const { ProjectModel, IssueModel } = require('../models/issue.js');

async function findOrInsertProject(projectName) {
  try {
    // TODO: Sanitize input to prevent NoSQL injection
    let project = await ProjectModel.findOne({ name: projectName });

    if (!project) {
      const newProject = new ProjectModel({
        name: projectName
      });
      project = await newProject.save();
    }
    return project._id;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find users');
  }

}

async function getAllIssues(project, filterOptions) {

  const projectId = findOrInsertProject(project);

  // TODO: Process/validate filter options

  try {
    const issues = await IssueModel.find({ project: projectId, ...filterOptions });
    // TODO: Only return necessary fields
    return issues;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find users');
  }
}

async function createIssue(project, issue) {

  const projectId = findOrInsertProject(project);

  // TODO: Validate issue

  try {
    const saveableIssue = new IssueModel({ project: projectId, ...issue });
    const savedIssue = await saveableIssue.save();
    // TODO: Only return necessary fields
    return savedIssue;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find users');
  }
}

async function updateIssueById(id, updateOptions) {

  // TODO: Validate id and update shite

  try {
    await IssueModel.findByIdAndUpdate(id, updateOptions);
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find users');
  }
}

async function deleteIssueById(id) {

  // TODO: Validate id

  try {
    await IssueModel.findByIdAndDelete(id);
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find users');
  }
}

exports.getAllIssues = getAllIssues;
exports.createIssue = createIssue;
exports.updateIssueById = updateIssueById;
exports.deleteIssueById = deleteIssueById;
