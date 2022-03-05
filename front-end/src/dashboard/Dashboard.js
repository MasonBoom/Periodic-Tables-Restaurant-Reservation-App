import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import { Link } from "react-router-dom";
import ReservationList from "../lists/ReservationList";
import TableList from "../lists/TableList";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // loads the initial list of tables and reservations
  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1 className="d-flex justify-content-center">Dashboard</h1>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center mt-4">
            <Link to={`/dashboard?date=${previous(date)}`}>
              <button className="btn btn-secondary mr-2 btn-lg">
                <span className="oi oi-arrow-left mr-3"></span>Previous
              </button>
            </Link>
            <Link to={`/dashboard?date=${today()}`}>
              <button className="btn btn-secondary mr-2 btn-lg">Today</button>
            </Link>
            <Link to={`/dashboard?date=${next(date)}`}>
              <button className="btn btn-secondary btn-lg">Next<span className="oi oi-arrow-right ml-3"></span></button>
            </Link>
          </div>
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h4 className="mb-0">Reservations for date {date}</h4>
          </div>
          <ErrorAlert error={reservationsError} />

          <div className="d-flex justify-content-center">
            <ReservationList
              reservations={reservations}
              setReservations={setReservations}
              date={date}
              fromSearch={false}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="mt-4">
            <h4 className="d-flex justify-content-center">Tables</h4>
          </div>
          <ErrorAlert error={tablesError} />
          <div className="d-flex justify-content-center">
            <TableList
              tables={tables}
              setTables={setTables}
              setReservations={setReservations}
              date={date}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
