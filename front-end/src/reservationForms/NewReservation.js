import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postReservation } from "../utils/api";
import { asDateString } from "../utils/date-time";
import ReservationForm from "./ReservationForm";

export default function NewReservation() {
  const history = useHistory();
  const today = new Date();

  // sets the default state
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: asDateString(today),
    reservation_time: today.toTimeString().slice(0, 5),
    people: "",
  };
  const [reservation, setReservation] = useState({ ...initialState });
  const [reservationErrors, setReservationErrors] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await postReservation({
        ...reservation,
        people: Number(reservation.people),
      }, abortController.signal);
    } catch (error) {
      setReservationErrors(error.message.split("."));

      return;
    }
    let resDate = reservation.reservation_date;
    setReservation({ ...initialState });
    history.push(`/dashboard?date=${resDate}`);
  }

  return (
    <>
      {!reservationErrors ? null : (
        <div className="alert alert-danger mt-2">
          <ul>
            {reservationErrors.map((errMsg, index) => (
              errMsg && <li key={index}>{errMsg.replace(/[_]/g, " ")}</li>
            ))}
          </ul>
        </div>
      )}
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
        status={"Create"}
      />
    </>
  );
}