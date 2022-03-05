import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postTable } from "../utils/api";
import TableForm from "./TableForm";

export default function NewTable() {
  const history = useHistory();
  //sets the default state
  const initialState = {
    table_name: "",
    capacity: "",
  };

  const [table, setTable] = useState({ ...initialState });
  const [tableErrors, setTableErrors] = useState(null);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      await postTable({
        ...table,
        capacity: Number(table.capacity),
      });
    } catch (error) {
      setTableErrors(error.message.split("."));
      return;
    }
    setTable({ ...initialState });
    history.push(`/dashboard`);
  }

  return (
    <>
      {!tableErrors ? null : (
        <div className="alert alert-danger mt-2">
          <ul>
            {tableErrors.map((errMsg, index) => (
              errMsg && <li key={index}>{errMsg.replace(/[_]/g, " ")}</li>
            ))}
          </ul>
        </div>
      )}
      <TableForm
        table={table}
        setTable={setTable}
        submitHandler={submitHandler}
      />
    </>
  );
}