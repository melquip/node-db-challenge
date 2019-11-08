exports.seed = function (knex) {
  return knex('project').truncate()
    .then(function () {
      return knex('project').insert([
        {
          "name": "How to cut paper",
          "description": "How do you even cut a paper sheet? Find out now!",
          "completed": false,
        },
        {
          "name": "How to turn on pc",
          "description": "How do you even turn a pc on? We'll tell you now!",
          "completed": false,
        },
      ]);
    });
};
