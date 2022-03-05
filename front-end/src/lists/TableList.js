import React from "react";
import TableItem from "./TableItem";

export default function TableList({
  tables,
  setTables,
  setReservations,
  date,
}) {
  // maps each item from the table to the table row
  const listItems = tables?.map((table) => (
    <tr key={table.table_id}>
      <TableItem
        table={table}
        setTables={setTables}
        setReservations={setReservations}
        date={date}
      />
    </tr>
  ));
  return (
    <table className="table mt-3 w-auto table-bordered">
      <thead className="thead-ox">
        <tr>
          <th>#</th>
          <th>Table name</th>
          <th>Capacity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody className="tbody-white">{listItems}</tbody>
    </table>
  );
}