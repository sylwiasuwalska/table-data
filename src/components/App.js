import React from "react";
import "../App.css";
import Store from "./Store";
import Table from "./Table";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Store>
        <div className="App">
          <header className="appHeader">
            <h1>Table of data</h1>
          </header>
          <Table />
        </div>
      </Store>
    </Router>
  );
}

export default App;
