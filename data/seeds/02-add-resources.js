exports.seed = function (knex) {
  return knex('resource').truncate()
    .then(function () {
      return knex('resource').insert([
        {
          "name": "Person",
          "description": "A human being"
        },
        {
          "name": "Scissors",
          "description": "A tool to cut stuff"
        },
        {
          "name": "Paper",
          "description": "A paper sheet"
        },
        {
          "name": "Computer",
          "description": "A machine that does stuff"
        },
      ]);
    });
};
