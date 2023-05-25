import React, { useState } from "react";
import InitialEntries from "./components/IntialEntries";
import FetchSymbol from "./FetchSymbol.jsx";
import DatePicker from "./components/DatePicker";
import SelectCurrency from "./components/SelectCurrency";
import StockSelectionInputs from "./components/StocksAndPercentages";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [initialPortfolioAmount, setInitialPortfolioAmount] = useState();
  const [percentages, setTotalPercentages] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    totalPercent: 0,
  });
  const [
    initialIndividualStockDollarAmount,
    setInitialIndividualStockDollarAmount,
  ] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
  });
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
      />
      <FetchSymbol date={"2023-05-18"} symbol={"AAPL"} />
    </div>
  );
}

export default App;
