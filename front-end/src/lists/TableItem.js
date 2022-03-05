import React from "react";
import { deleteSeat } from "../utils/api";
import { listReservations, listTables } from "../utils/api";

export default function TableItem({ table, setTables, setReservations, date }) {
  let status = !table.reservation_id ? "Free" : "Occupied";

  // window popup to confirm if you want to open up a table for other reservations
  async function deleteHandler(table) {
    const abortController = new AbortController();
    let result = window.confirm(
      "Is this table ready to seat new guests? \n This cannot be undone."
    );
    if (result) {
      return deleteSeat(table, abortController.signal).then();
    }
  }

  // function to refresh tables when the finish button is pressed
  function refreshTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }
  
  // function to refresh reservations when the finish button is pressed
  function refreshRes() {
    const abortController = new AbortController();
    listReservations({ date }, abortController.signal).then(setReservations);
    return () => abortController.abort();
  }

  return (
    <>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{status}</td>
      <td>
        {table.reservation_id && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            data-table-id-finish={table.table_id}
            onClick={(event) => {
              event.preventDefault();
              deleteHandler(table).then(refreshTables).then(refreshRes);
            }}
          >
            Finish
          </button>
        )}
      </td>
    </>
  );
}