import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { stateContext } from "./Store";
import { useHistory } from "react-router-dom";
import moment from 'moment';

function Company(props) {
  useEffect(() => props.setActualLocation(props.history.location.pathname), []);
  const state = useContext(stateContext);
  const [incomeData, setIncomeData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

  const fetchData = (id) => {
    axios
      .get(`https://recruitment.hal.skygate.io/incomes/${id}`)
      .then((response) => {
        const sortedIncomes = response.data.incomes.sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateA > dateB ? 1 : -1;
        });
        console.log(sortedIncomes);
        setIncomeData(sortedIncomes);
        setIsDataReady(true);
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
  }, []);

  let history = useHistory();
  console.log("start");

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(e)
  }
  const handleChange = (e) => {
      if (e.target.name==="start") {
          setStartDate(e.target.value)
      }
      if (e.target.name==="end") {
          setEndDate(e.target.value)
      }
  }


  return (
    <>
      <div>{company}</div>
      {isDataReady && (
        <form onSubmit={handleSubmit}>
          <label>
              <p>Start Date - first possible: {`${moment(incomeData[0].date).format('YYYY-MM-DD')}`}</p>
            <input
              type="date"
              name="start"
              min={`${moment(incomeData[0].date).format('YYYY-MM-DD')}`}
              max={`${moment(incomeData[incomeData.length-1].date).format('YYYY-MM-DD')}`}
              onChange={handleChange}
            />
          </label>
          <label>
              <p>End Date - last possible {`${moment(incomeData[incomeData.length-1].date).format('YYYY-MM-DD')}`}</p>
            <input
              type="date"
              name="end"
              min={`${moment(incomeData[0].date).format('YYYY-MM-DD')}`}
              max={`${moment(incomeData[incomeData.length-1].date).format('YYYY-MM-DD')}`}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      )}
      <button onClick={() => history.goBack()}> ← take me back</button>
    </>
  );
}

export default Company;
