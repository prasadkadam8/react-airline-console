import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import PageNotFound from "./components/PageNotFound";

const FlightlistPage = lazy(() => import("./components/flightlist/FlightlistPage"));
const FlightPage = lazy(() => import("./components/flightlist/FlightPage"));
const Login = lazy(() => import("./components/login/login"));
const InflightService = lazy(() => import("./components/inFlightServices/InFlightServices"));
const AdminDashboard = lazy(() => import("./components/adminDashboard/adminDashboard"));
const AdminFlightPage = lazy(() => import("./components/adminDashboard/adminFlightPage"));
const history = createBrowserHistory();
 
const Routes = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route
            exact
            path="/flightlist"
            component={FlightlistPage}
          ></Route>
          <Route
            exact
            path="/flight/:flightnumber"
            component={FlightPage}
          ></Route>
          <Route
            exact
            path="/in-flight-service/:flightnumber"
            component={InflightService}
          ></Route> 
          <Route
            exact
            path="/adminDashboard"
            component={AdminDashboard}
          ></Route>        
          <Route
            exact
            path="/admin/flight/:flightnumber"
            component={AdminFlightPage}
          ></Route>    
          <Route component={PageNotFound} />    
        </Switch>
      </Router>{" "}
    </Suspense>
  );
};

export default Routes;
