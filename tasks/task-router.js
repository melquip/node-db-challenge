const express = require('express');

const Tasks = require('./task-model');
const Projects = require('../projects/project-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Tasks.getTasks().then(tasks => {
    if (tasks) {
      res.status(200).json(tasks);
    } else {
      next({ message: "No tasks were found", status: 404 });
    }
  }).catch(next);
});

router.get('/:id', validateTaskId, (req, res, next) => {
  res.status(200).json(req.task);
});

router.post('/', validateTaskBody, (req, res, next) => {
  Tasks.add(req.body).then(task => {
    res.status(201).json(task);
  }).catch(next);
});

router.put('/:id', validateTaskId, validateTaskBody, (req, res, next) => {
  Tasks.update(req.body, req.task.id).then(updatedScheme => {
    res.status(200).json(updatedScheme);
  }).catch(next);
});

router.delete('/:id', validateTaskId, (req, res, next) => {
  Tasks.remove(req.task.id).then(deleted => {
    res.status(204).json(req.task);
  }).catch(next);
});

function validateTaskId(req, res, next) {
  const { id } = req.params;
  let validId = Number(id);
  if (!Number.isInteger(validId) && validId > 0) {
    next({ message: 'Invalid task id' })
  }
  Tasks.getTask(validId).then(task => {
    if (task) {
      req.task = task
      next();
    } else {
      next({ message: 'Could not find task with given id', status: 404 });
    }
  }).catch(next);
}

function validateTaskBody(req, res, next) {
  const { id, description, notes, completed, project_id } = req.body;
  if (!description || typeof completed === 'undefined' || !project_id) {
    next({ message: 'Missing one of the required fields: `description`, `completed`, `project_id`.', status: 401 });
  }
  let validId = Number(project_id);
  if (!Number.isInteger(validId) && validId > 0) {
    next({ message: 'Invalid project_id' });
  }
  Projects.getProject(validId).then(project => {
    if (project) {
      req.project = project;
      req.body = { id, description, notes, completed, project_id };
      next();
    } else {
      next({ message: 'Could not find project with given id', status: 404 });
    }
  }).catch(next);
}

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    file: 'task-router',
    method: req.method,
    url: req.url,
    status: error.status || 500,
    message: error.message
  });
})

module.exports = router;