const express = require('express');

const Resources = require('./resource-model');

const router = express.Router();

router.get('/', (req, res, next) => {
  Resources.getResources().then(resources => {
    if (resources) {
      res.status(200).json(resources);
    } else {
      next({ message: "No resources were found", status: 404 });
    }
  }).catch(next);
});

router.get('/:id', validateResourceId, (req, res, next) => {
  res.status(200).json(req.resource);
});

router.post('/', validateResourceBody, (req, res, next) => {
  Resources.add(req.body).then(resource => {
    res.status(201).json(resource);
  }).catch(next);
});

router.put('/:id', validateResourceId, validateResourceBody, (req, res, next) => {
  Resources.update(req.body, req.resource.id).then(updatedScheme => {
    res.status(200).json(updatedScheme);
  }).catch(next);
});

router.delete('/:id', validateResourceId, (req, res, next) => {
  Resources.remove(req.resource.id).then(deleted => {
    res.status(204).json(req.resource);
  }).catch(next);
});

function validateResourceId(req, res, next) {
  const { id } = req.params;
  let validId = Number(id);
  if (!Number.isInteger(validId) && validId > 0) {
    next({ message: 'Invalid resource id' })
  }
  Resources.getResource(validId).then(resource => {
    if (resource) {
      req.resource = resource
      next();
    } else {
      next({ message: 'Could not find resource with given id', status: 404 });
    }
  }).catch(next);
}

function validateResourceBody(req, res, next) {
  const { id, name, description } = req.body;
  if (!name) {
    next({ message: 'Missing required `name` field', status: 401 });
  }
  req.body = { id, name, description };
  next();
}

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    file: 'resource-router',
    method: req.method,
    url: req.url,
    status: error.status || 500,
    message: error.message
  });
})

module.exports = router;