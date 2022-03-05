import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({
  setReservation,
  reservation,
  submitHandler,
  status,
}) 

{
  const history = useHistory();

  function changeHandler({ target: { name, value } }) {
    setReservation((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  }

  async function cancelHandler(event) {
    event.preventDefault();
    history.push(`/dashboard`);
  }

  return (
    <>
      <div className="row">
        <h2 className="col d-flex justify-content-center mb-4">
          {status} Reservation
        </h2>
      </div>
      <form>
        <fieldset>
          <div className="row mt-3">
            <div className="form-group col">
              <label
                htmlFor="first_name"
                className="d-flex justify-content-center"
              >
                First Name
              </label>
              <div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="First Name"
                  required
                  value={reservation.first_name}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label
                htmlFor="last_name"
                className="d-flex justify-content-center"
              >
                Last Name
              </label>
              <div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Last Name"
                  required
                  value={reservation.last_name}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label
                htmlFor="mobile_number"
                className="d-flex justify-content-center"
              >
                Mobile Number
              </label>
              <div>
                <input
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  required
                  value={reservation.mobile_number}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group col">
              <label htmlFor="people" className="d-flex justify-content-center">
                People
              </label>
              <div>
                <input
                  type="number"
                  id="people"
                  name="people"
                  placeholder="Number of People in Party"
                  value={reservation.people}
                  onChange={changeHandler}
                  className="form-control"
                  required
                  min="1"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label
                htmlFor="reservation_date"
                className="d-flex justify-content-center"
              >
                Reservation Date
              </label>
              <div>
                <input
                  type="date"
                  id="reservation_date"
                  name="reservation_date"
                  required
                  value={reservation.reservation_date}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
              <div className="mt-4 d-flex justify-content-end">
                <button
                  type="cancel"
                  className="btn btn-secondary"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className="form-group col">
              <label
                htmlFor="reservation_time"
                className="d-flex justify-content-center"
              >
                Reservation Time
              </label>
              <div>
                <input
                  type="time"
                  id="reservation_time"
                  name="reservation_time"
                  required
                  value={reservation.reservation_time}
                  onChange={changeHandler}
                  className="form-control"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={submitHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}