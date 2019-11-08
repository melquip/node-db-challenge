exports.seed = function (knex) {
  return knex('project_resource').truncate()
    .then(function () {
      return knex('project_resource').insert([
        {
          "project_id": 1,
          "resource_id": 1,
        },
        {
          "project_id": 1,
          "resource_id": 2,
        },
        {
          "project_id": 1,
          "resource_id": 3,
        },
        {
          "project_id": 2,
          "resource_id": 1,
        },
        {
          "project_id": 2,
          "resource_id": 4,
        },
      ]);
    });
};
