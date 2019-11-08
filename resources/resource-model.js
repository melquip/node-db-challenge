const db = require('../data/db-config');

const getResources = () => {
  return db('resource');
}

const getResource = (id) => {
  return db('resource').where({ id }).then(resources => resources[0]);
}

const add = (resource) => {
  return db('resource').insert(resource).then((ids) => getResource(ids[0]));
}

const update = (changes, id) => {
  return db('resource').where({ id }).update(changes).then(() => getResource(id));
}

const remove = (id) => {
  return db('resource').where({ id }).del();
}

module.exports = {
  getResources,
  getResource,
  add,
  update,
  remove,
}