import * as Knex from 'knex';
const knexfile = require('./knexfile');

const knex = Knex(knexfile['development'])

export default knex;