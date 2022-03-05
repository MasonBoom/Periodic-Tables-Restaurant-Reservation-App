const knex = require("../db/connection");

// lists tables
function list() {
  return knex("tables").select("*").orderBy("table_name", "asc");
}

// finds a single table
function read(table_id) {
  return knex("tables").select("*").where({ table_id: table_id }).first();
}

// creates table
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdTable) => createdTable[0]);
}

// updates table
function update(table_id, { reservation_id }) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id })
    .returning("*")
    .then((table) => table[0]);
}

// removes reservation_id for a specific table
function destroy(table_id) {
  return knex("tables")
    .where({ table_id })
    .update({ reservation_id: null })
    .returning("*")
    .then((table) => table[0]);
}

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};