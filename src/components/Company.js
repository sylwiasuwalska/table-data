import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { stateContext } from "./Store";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Company(props) {
  useEffect(() => props.setActualLocation(props.history.location.pathname), []);
  const state = useContext(stateContext);
  const [incomeData, setIncomeData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = (id) => {
    axios
      .get(`https://recruitment.hal.skygate.io/incomes/${id}`)
      .then((response) => {
        const sortedIncomes = response.data.incomes.sort((a, b) => {
          let dateA = new Date(a.date);
          let dateB = new Date(b.date);
          return dateA > dateB ? 1 : -1;
        });
        setIncomeData(sortedIncomes);
        setIsDataReady(true);
        setStartDate(moment(sortedIncomes[0].date).format("YYYY-MM-DD"));
        setEndDate(
          moment(sortedIncomes[sortedIncomes.length - 1].date).format(
            "YYYY-MM-DD"
          )
        );
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

  const totalIncomeInRange = incomeData
    .filter((element) => {
      return moment(element.date).isBetween(
        moment(startDate),
        moment(endDate),
        "day",
        "[]"
      );
    })
    .reduce((total, current) => {
      const currentIncome = parseFloat(current.value);
      return total + currentIncome;
    }, 0)
    .toFixed(2);

  const numberOfMonthsInRange = moment(endDate).diff(
    moment(startDate),
    "months"
  );

  const averageIncomeInRange = (
    totalIncomeInRange / numberOfMonthsInRange
  ).toFixed(2);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    if (e.target.name === "start") {
      setStartDate(e.target.value);
    }
    if (e.target.name === "end") {
      setEndDate(e.target.value);
    }
  };

  useEffect(() => {
    fetchData(props.match.params.id);
  }, []);

  let history = useHistory();

  if (!isDataReady) {
    return "Loading";
  }

  if (isDataReady) {
    return (
      <>
        <div className="companyView">
          <div className="incomeData">{company}</div>
          {isDataReady && (
            <>
              <form onSubmit={handleSubmit} className="incomeData">
                <label>
                  <p>
                    Start Date - first possible:{" "}
                    {`${moment(incomeData[0].date).format("YYYY-MM-DD")}`}
                  </p>
                  <input
                    type="date"
                    name="start"
                    min={`${moment(incomeData[0].date).format("YYYY-MM-DD")}`}
                    max={`${moment(
                      incomeData[incomeData.length - 1].date
                    ).format("YYYY-MM-DD")}`}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p>
                    End Date - last possible{" "}
                    {`${moment(incomeData[incomeData.length - 1].date).format(
                      "YYYY-MM-DD"
                    )}`}
                  </p>
                  <input
                    type="date"
                    name="end"
                    min={`${moment(incomeData[0].date).format("YYYY-MM-DD")}`}
                    max={`${moment(
                      incomeData[incomeData.length - 1].date
                    ).format("YYYY-MM-DD")}`}
                    onChange={handleChange}
                  />
                </label>
              </form>
              <div className="incomeData">
                <p>Incomes between dates: </p>
                <p>
                  {`${startDate}`} and {`${endDate}`}
                </p>

                <p>Total: {totalIncomeInRange}</p>
                <p>
                  Average:{" "}
                  {averageIncomeInRange == "Infinity"
                    ? "Choose at least one month range"
                    : averageIncomeInRange}
                </p>
              </div>
            </>
          )}
        </div>
        <button onClick={() => history.goBack()}> ← take me back</button>
      </>
    );
  }
}

export default Company;
