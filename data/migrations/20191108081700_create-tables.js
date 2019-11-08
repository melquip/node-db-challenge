exports.up = function (knex) {
  return knex.schema
    .createTable('project', project => {
      project.increments();
      project.string('name', 100).notNullable();
      project.text('description', 255);
      project.boolean('completed').notNullable().defaultTo(false);
    })
    .createTable('resource', resource => {
      resource.increments();
      resource.string('name', 100).unique().notNullable();
      resource.text('description', 255);
    })
    .createTable('task', task => {
      task.increments();
      task.text('description').notNullable();
      task.text('notes');
      task.boolean('completed').notNullable().defaultTo(false);
      task.integer('project_id').notNullable().references('id').inTable('project');
    })
    .createTable('project_resource', task => {
      task.primary(['project_id', 'resource_id']);
      task.integer('project_id').notNullable().references('id').inTable('project');
      task.integer('resource_id').notNullable().references('id').inTable('resource');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('project_resource')
    .dropTableIfExists('task')
    .dropTableIfExists('resource')
    .dropTableIfExists('projects');
};