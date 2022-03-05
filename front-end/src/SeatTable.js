import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "./layout/ErrorAlert";
import { listTables } from "./utils/api";
import { updateTable } from "./utils/api";

export default function SeatTable() {
  const { reservation_id } = useParams();
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currentTable, setCurrentTable] = useState(0);

  let tableOptions = tables.map((table) => (
    <option key={table.table_id} value={table.table_id}>
      {table.table_name} - {table.capacity}
    </option>
  ));

  // loads the list of tables that are available
  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
      await updateTable(
        currentTable,
        { reservation_id },
        abortController.signal
      );
    } catch (error) {
      setTablesError(error);
      return;
    }
    history.push(`/dashboard`);
    return () => abortController.abort();
  }

  function changeHandler(event) {
    return setCurrentTable(event.target.value);
  }
  async function cancelHandler(event) {
    event.preventDefault();
    history.push(`/dashboard`);
  }

  return (
    <>
      <ErrorAlert error={tablesError} />
      <div className="row">
        <h2 className="col">Seat Reservation</h2>
      </div>
      <div className="row">
        <h4 className="col">
          Please select a table for reservation #{reservation_id}
        </h4>
      </div>
      <div className="row">
        <div className="col-auto">
          <select
            id="input"
            name="table_id"
            required
            value={currentTable}
            onChange={changeHandler}
            className="form-control"
          >
            <option value={0}>Select a table</option>
            {tableOptions}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <button
          type="cancel"
          className="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </>
  );
}