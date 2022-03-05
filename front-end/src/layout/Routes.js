import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";
import NewReservation from "../reservationForms/NewReservation";
import useQuery from "../utils/useQuery";
import NewTable from "../tableForms/NewTable";
import SeatTable from "../SeatTable";
import SearchBar from "../SearchBar";
import EditReservation from "../reservationForms/EditReservation";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  let date = query.get("date");

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <SeatTable />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/new">
        <NewReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route path="/tables/new">
        <NewTable />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route path="/search">
        <SearchBar />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;