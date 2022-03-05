import React, { useState } from "react";
import ReservationList from "./lists/ReservationList";
import { mobileNumberSearch } from "./utils/api";

export default function Search() {
  const [number, setNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [searched, setSearched] = useState(false);

  function changeHandler(event) {
    return setNumber(event.target.value);
  }

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      const data = await mobileNumberSearch(number, abortController.signal);
      setReservations(data);
      setSearched(true);
    } catch (error) {
      return;
    }
    return () => abortController.abort();
  }

  return (
    <>
      <div className="row">
        <h2 className="col d-flex justify-content-center">
          Search by Mobile Number
        </h2>
      </div>
      <div className="row d-flex justify-content-center mt-3">
        <div className="col-auto">
          <input
            id="input"
            name="mobile_number"
            required
            value={number}
            onChange={changeHandler}
            className="form-control"
            placeholder="Please enter a number"
          />
        </div>
        <div className="row">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Find
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {!reservations?.length && searched && (
          <div className="row">
            <div className="col text-danger mt-4">
              <h3>No reservations found</h3>
            </div>
          </div>
        )}
        {reservations?.length > 0 && searched && (
          <div className="row mt-4">
            <div className="col">
              <ReservationList
                reservations={reservations}
                setReservations={setReservations}
                fromSearch={true}
                number={number}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}