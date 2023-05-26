import React, { useState } from "react";
import InitialEntries from "./components/IntialEntries";
import FetchSymbol from "./FetchSymbol.jsx";
import DatePicker from "./components/DatePicker";
import SelectCurrency from "./components/SelectCurrency";
import StockSelectionInputs from "./components/StocksAndPercentages";
import { Chart } from "react-google-charts";
import moment from "moment";
import "./App.css";

function App() {
  const [date, setDate] = useState("2023-05-18");
  const [initialPortfolioAmount, setInitialPortfolioAmount] = useState(5000);
  const [percentages, setTotalPercentages] = useState({
    value0: 0,
    value1: 0,
    value2: 0,
    value3: 0,
    totalPercent: 0,
  });
  const [
    initialIndividualStockDollarAmount,
    setInitialIndividualStockDollarAmount,
  ] = useState({
    value0: 0,
    value1: 0,
    value2: 0,
    value3: 0,
  });
  const [stockSymbols, setStockSymbols] = useState({
    stock0: "AAPL",
    stock1: "AAPL",
    stock2: "AAPL",
    stock3: "AAPL",
  });
  const [
    finalIndividualStockDollarAmount,
    setFinalIndividualStockDollarAmount,
  ] = useState({});
  const data = [
    ["Stock", "Total Portfolio Amount"],
    [stockSymbols.stock0, initialIndividualStockDollarAmount.value0],
    [stockSymbols.stock1, initialIndividualStockDollarAmount.value1],
    [stockSymbols.stock2, initialIndividualStockDollarAmount.value2],
    [stockSymbols.stock3, initialIndividualStockDollarAmount.value3],
  ];

  const data1 = [
    ["Stock", "Total Portfolio Amount"],
    [
      stockSymbols.stock0,
      finalIndividualStockDollarAmount[stockSymbols.stock0],
    ],
    [
      stockSymbols.stock1,
      finalIndividualStockDollarAmount[stockSymbols.stock1],
    ],
    [
      stockSymbols.stock2,
      finalIndividualStockDollarAmount[stockSymbols.stock2],
    ],
    [
      stockSymbols.stock3,
      finalIndividualStockDollarAmount[stockSymbols.stock3],
    ],
  ];

  const options = {
    title: `Initial Portfolio Allocation - ${moment(date).format(
      "MM-DD-YYYY"
    )} - $${initialPortfolioAmount}`,
  };

  const options1 = {
    title: `Current Portfolio Allocation - ${moment().format(
      "MM-DD-YYYY"
    )} - $${
      isNaN(
        (
          finalIndividualStockDollarAmount[stockSymbols.stock0] +
          finalIndividualStockDollarAmount[stockSymbols.stock1] +
          finalIndividualStockDollarAmount[stockSymbols.stock2] +
          finalIndividualStockDollarAmount[stockSymbols.stock3]
        )?.toFixed(2)
      )
        ? 0
        : (
            finalIndividualStockDollarAmount[stockSymbols.stock0] +
            finalIndividualStockDollarAmount[stockSymbols.stock1] +
            finalIndividualStockDollarAmount[stockSymbols.stock2] +
            finalIndividualStockDollarAmount[stockSymbols.stock3]
          )?.toFixed(2)
    }`,
  };
  // console.log(data, data1);

  return (
    <div id="mainDiv">
      <h1>Your portfolio over time</h1>
      <DatePicker date={date} setDate={setDate} />
      <SelectCurrency
        initialPortfolioAmount={initialPortfolioAmount}
        setInitialPortfolioAmount={setInitialPortfolioAmount}
      />
      <StockSelectionInputs
        percentages={percentages}
        date={date}
        setInitialIndividualStockDollarAmount={
          setInitialIndividualStockDollarAmount
        }
        initialIndividualStockDollarAmount={initialIndividualStockDollarAmount}
        initialPortfolioAmount={initialPortfolioAmount}
        setTotalPercentages={setTotalPercentages}
        stockSymbols={stockSymbols}
        setFinalIndividualStockDollarAmount={
          setFinalIndividualStockDollarAmount
        }
        setStockSymbols={setStockSymbols}
      />
      <div>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
        <Chart
          chartType="PieChart"
          data={data1}
          options={options1}
          width={"100%"}
          height={"400px"}
        />
      </div>

      {/* <FetchSymbol date={"2023-05-18"} symbol={"AAPL"} /> */}
    </div>
  );
}

export default App;
