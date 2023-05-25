import React, { useState } from "react";
import InitialEntries from "./components/IntialEntries";
import FetchSymbol from "./FetchSymbol.jsx";
import DatePicker from "./components/DatePicker";
import SelectCurrency from "./components/SelectCurrency";
import StockSelectionInputs from "./components/Stocks";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);
  const [percentages, setTotalPercentages] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    totalPercent: 0,
  });
  return (
    <div id="mainDiv">
      <h1>Your portfolio over time</h1>
      <DatePicker date={date} setDate={setDate} />
      <SelectCurrency
        initialAmount={initialAmount}
        setInitialAmount={setInitialAmount}
      />
      <StockSelectionInputs
        percentages={percentages}
        setTotalPercentages={setTotalPercentages}
      />
      <FetchSymbol date={"2023-05-18"} symbol={"AAPL"} />
    </div>
  );
}

export default App;
