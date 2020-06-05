import React, { useContext, useEffect } from "react";
import { stateContext } from "./Store";
import { useHistory } from "react-router-dom";

function Company(props) {
  useEffect(() => props.setActualLocation(props.history.location.pathname), []);
  const state = useContext(stateContext);

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
            <p key={index.lastMonthIncome}>Last month income: {lastMonthIncome}</p>
        </div>
      );
    });
  console.log(company);
  let history = useHistory();

  return (
    <>
      <button onClick={() => history.goBack()}> ← take me back</button>
      <div>{company}</div>
    </>
  );
}

export default Company;
