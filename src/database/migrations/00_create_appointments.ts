import Knex from 'knex'

async function up(knex: Knex) {
	return knex.schema.createTable('appointments', (table) => {
		table.increments('id').primary(),
			table.string('description').notNullable(),
			table.timestamp('datetime').notNullable()
	})
}

async function down(knex: Knex) {
	return knex.schema.dropTable('appointments')
}

module.exports = { up, down }
