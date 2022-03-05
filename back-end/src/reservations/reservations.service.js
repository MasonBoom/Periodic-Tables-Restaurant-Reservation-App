const knex = require("../db/connection");

// lists reservations for a specific date
function list(date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date: date })
    .whereNot({ status: "finished" })
    .whereNot({ status: "cancelled" })
    .orderBy("reservation_time", "asc");
}

// finds a single reservation
function read(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

// creates a new reservation
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdReservation) => createdReservation[0]);
}

// updates the status field of a reservation
function statusUpdate(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status })
    .returning("*")
    .then((updated) => updated[0]);
}

// lists reservations for a specific mobile number 
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

// updates an existing reservation
function update(reservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation.reservation_id })
    .update(reservation, "*")
    .then((reservation) => reservation[0]);
}

module.exports = {
  list,
  create,
  read,
  statusUpdate,
  search,
  update,
};