const db = require('../data/db-config');

const getProjects = () => {
  return db('project');
}

const getProject = (id) => {
  return db('project').where({ id });
}

const add = (project) => {
  return db('project').insert(project);
}

const update = (changes, id) => {
  return db('project').where({ id }).update(changes).then(() => getProject(id));
}

const remove = (id) => {
  return db('project').where({ id }).del();
}

module.exports = {
  getProjects,
  getProject,
  add,
  update,
  remove,
}