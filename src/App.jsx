import React, { useState } from "react";
import DatePicker from "./components/DatePicker";
import SelectCurrency from "./components/SelectCurrency";
import StockSelectionInputs from "./components/StocksAndPercentages";
import { Chart } from "react-google-charts";
import moment from "moment";
import "./App.css";

function App() {
  const [date, setDate] = useState("2023-04-10");
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
    stock1: "MSFT",
    stock2: "V",
    stock3: "WMT",
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

  let data1 = [["Stock", "Total Portfolio Amount"]];
  Object.keys(finalIndividualStockDollarAmount).map((stock, num) => {
    data1.push([stock, finalIndividualStockDollarAmount[stock]]);
  });

  const options = {
    title: `Initial Portfolio Allocation - ${moment(date).format(
      "MM-DD-YYYY"
    )} - $${initialPortfolioAmount}`,
  };

  const options1 = {
    title: `Current Portfolio Allocation - ${moment()
      .subtract(3, "days")
      .format("MM-DD-YYYY")} - $${Object.values(
      finalIndividualStockDollarAmount
    )
      .reduce((a, b) => a + b, 0)
      .toFixed(2)}`,
  };

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
        {Object.keys(finalIndividualStockDollarAmount).length > 0 && (
          <>
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
              format="currency"
              formatters={[
                {
                  type: "NumberFormat",
                  column: 1,
                  options: {
                    prefix: "$",
                  },
                },
              ]}
            />
            <Chart
              chartType="PieChart"
              data={data1}
              options={options1}
              width={"100%"}
              height={"400px"}
              formatters={[
                {
                  type: "NumberFormat",
                  column: 1,
                  options: {
                    prefix: "$",
                  },
                },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
