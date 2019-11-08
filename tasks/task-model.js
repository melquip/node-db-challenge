const db = require('../data/db-config');

const getTasks = () => {
  return db('task');
}

const getTask = (id) => {
  return db('task').where({ id }).then(tasks => tasks[0]);
}

const add = (task) => {
  return db('task').insert(task).then((ids) => getTask(ids[0]));
}

const update = (changes, id) => {
  return db('task').where({ id }).update(changes).then(() => getTask(id));
}

const remove = (id) => {
  return db('task').where({ id }).del();
}

module.exports = {
  getTasks,
  getTask,
  add,
  update,
  remove,
}