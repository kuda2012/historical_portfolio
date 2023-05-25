import React, { useState } from "react";
import InitialEntries from "./components/IntialEntries";
import FetchSymbol from "./FetchSymbol.jsx";
import DatePicker from "./components/DatePicker";
import SelectCurrency from "./components/SelectCurrency";
import StockSelectionInputs from "./components/StocksAndPercentages";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
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
  console.log(
    initialPortfolioAmount,
    stockSymbols,
    initialIndividualStockDollarAmount,
    percentages
  );
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
        setInitialIndividualStockDollarAmount={
          setInitialIndividualStockDollarAmount
        }
        initialPortfolioAmount={initialPortfolioAmount}
        setTotalPercentages={setTotalPercentages}
        stockSymbols={stockSymbols}
        setStockSymbols={setStockSymbols}
      />
      <FetchSymbol date={"2023-05-18"} symbol={"AAPL"} />
    </div>
  );
}

export default App;
