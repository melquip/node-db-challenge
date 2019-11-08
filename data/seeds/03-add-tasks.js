exports.seed = function (knex) {
  return knex('task').truncate()
    .then(function () {
      return knex('task').insert([
        {
          "description": "Person picks up scissors in one hand",
          "completed": false,
          "project_id": 1,
          "notes": "Not by the tip, but on the handle",
        },
        {
          "description": "Person picks up paper in other hand",
          "completed": false,
          "project_id": 1,
          "notes": "",
        },
        {
          "description": "Person cuts paper with scissors",
          "completed": false,
          "project_id": 1,
          "notes": "",
        },
        {
          "description": "Person turns computer on",
          "completed": false,
          "project_id": 2,
          "notes": "Click the on/off button",
        },
      ]);
    });
};
