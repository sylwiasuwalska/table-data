import React from "react";
import "../App.css";
import Store from "./Store";
import Table from "./Table";
import Company from "./Company";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Store>
        <div className="App">
          <header className="appHeader">
            <h1>Table of data</h1>
          </header>

          <Switch>
            <Route exact path="/">
              <Table />
            </Route>
            <Route path="/:id" render={(props) => <Company {...props} />}>
            </Route>
          </Switch>
        </div>
      </Store>
    </Router>
  );
}

export default App;
