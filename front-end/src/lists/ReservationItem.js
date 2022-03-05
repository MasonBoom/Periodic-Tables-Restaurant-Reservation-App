import React from "react";
import { updateResStatus } from "../utils/api";
import { Link } from "react-router-dom";

export default function ReservationItem({ reservation, refreshRes }) {
  
  // window popup to confirm reservation cancellation
  async function cancelHandler(reservation_id) {
    const abortController = new AbortController();
    let result = window.confirm(
      "Do you want to cancel this reservation? \n This cannot be undone."
    );
    if (result) {
      return updateResStatus(
        reservation_id,
        "cancelled",
        abortController.signal
      ).then();
    }
  }

  return (
    <>
      <td>{reservation.reservation_id}</td>
      <td>
        {reservation.last_name}, {reservation.first_name}
      </td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date.slice(0, 10)}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>
        {reservation.status}
      </td>
      <td>
        {reservation.status === "booked" && (
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button
              className="btn btn-primary mr-2 btn-sm mb-1"
              type="submit"
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </button>
          </Link>
        )}
        {reservation.status === "booked" && (
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button
              className="btn btn-dark mr-2 btn-sm mb-1"
              type="submit"
              href={`/reservations/${reservation.reservation_id}/edit`}
            >
              Edit
            </button>
          </Link>
        )}
        {reservation.status === "booked" && (
          <button
            type="button"
            className="btn btn-secondary btn-sm mb-1"
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={(event) => {
              event.preventDefault();
              cancelHandler(reservation.reservation_id).then(refreshRes)
            }}
          >
            Cancel
          </button>
        )}
      </td>
    </>
  );
}