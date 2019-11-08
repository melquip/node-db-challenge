const db = require('../data/db-config');

const getProjects = () => {
  return db('project');
}

const getProject = (id) => {
  return db('project').where({ id }).then(projects => projects[0]);
}

const getProjectInfo = async (project) => {
  project.tasks = await db('task AS t')
    .where({ project_id: project.id })
    .select(
      't.id',
      't.description',
      't.notes',
      't.completed'
    );
  project.tasks = project.tasks.map(task => {
    task.completed = task.completed === 1 ? true : false;
    return task;
  });
  project.resources = await db('resource AS r')
    .join('project_resource AS pr', 'pr.resource_id', 'r.id')
    .where({ 'pr.project_id': project.id })
    .select('r.*');
  return project;
}

const add = (project) => {
  return db('project').insert(project).then((ids) => getProject(ids[0]));
}

const update = (changes, id) => {
  return db('project').where({ id }).update(changes).then(() => getProject(id));
}

const remove = (id) => {
  return db('project').where({ id }).del();
}

module.exports = {
  getProjectInfo,
  getProjects,
  getProject,
  add,
  update,
  remove,
}