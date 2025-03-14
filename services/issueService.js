const { ProjectModel, IssueModel } = require('../models/issue.js');

async function findProject(projectName) {
  try {
    const project = await ProjectModel.findOne({ name: projectName });

    return project?._id;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find project');
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
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to create project');
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

  // TODO: Process/validate filter options

  try {
    const issues = await IssueModel.find({ project: projectId, ...filterOptions });
    // TODO: Only return necessary fields
    return issues;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to find issues');
  }
}

async function createIssue(project, issue) {

  const projectId = await findOrInsertProject(project);

  // TODO: Validate issue

  try {
    const saveableIssue = new IssueModel({ project: projectId, ...issue });
    const savedIssue = await saveableIssue.save();
    // TODO: Only return necessary fields
    return savedIssue;
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to create issue');
  }
}

// NOTE: Maybe checking if issue belongs to project necessary
async function updateIssueById(id, updateOptions) {

  // TODO: Validate id and update shite

  try {
    await IssueModel.findByIdAndUpdate(id, updateOptions, { new: true });
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to update issue');
  }
}

// NOTE: Maybe checking if issue belongs to project necessary
async function deleteIssueById(id) {

  // TODO: Validate id

  try {
    await IssueModel.findByIdAndDelete(id);
  } catch (error) {
    // TODO: More secure error handling -> use Mongoose errors
    console.error(error);
    throw new Error('Failed to delete issue');
  }
}

exports.getAllIssues = getAllIssues;
exports.createIssue = createIssue;
exports.updateIssueById = updateIssueById;
exports.deleteIssueById = deleteIssueById;
