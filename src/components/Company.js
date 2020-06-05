import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { stateContext } from "./Store";
import { useHistory } from "react-router-dom";

function Company(props) {
  useEffect(() => props.setActualLocation(props.history.location.pathname), []);
  const state = useContext(stateContext);
  const [incomeData, setIncomeData] = useState([]);

  const fetchData = (id) => {
    axios
      .get(`https://recruitment.hal.skygate.io/incomes/${id}`)
      .then((response) => {
        setIncomeData(response.data.incomes);
      });

    //todo handle error
  };

  const company = state
    .filter((element) => element.id == props.match.params.id)
    .map((data, index) => {
      const {
        id,
        name,
        city,
        totalIncome,
        averageIncome,
        lastMonthIncome,
      } = data;

      return (
        <div key={index}>
          <h2>Company name: {name}</h2>
          <p key={index.id}>Company id: {id}</p>
          <p key={index.city}>City: {city}</p>
          <p key={index.totalIncome}>Total income: {totalIncome}</p>
          <p key={index.averageIncome}>Average income: {averageIncome}</p>
          <p key={index.lastMonthIncome}>
            Last month income: {lastMonthIncome}
          </p>
        </div>
      );
    });


  useEffect(() => {
    fetchData(props.match.params.id);
  },[]);

  let history = useHistory();

  return (
    <>
      <button onClick={() => history.goBack()}> ← take me back</button>
      <div>{company}</div>
    </>
  );
}

export default Company;
