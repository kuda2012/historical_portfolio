import React, { useState } from "react";
import { stockList } from "../assets/stockList";

const StockSelection = ({ stockSymbols, setStockSymbols, order }) => {
  const handleChange = (e) => {
    setStockSymbols((prevSymbols) => {
      return {
        ...prevSymbols,
        ["stock".concat(order)]: e.target.value,
      };
    });
  };
  return (
    <select value={stockSymbols["stock".concat(order)]} onChange={handleChange}>
      {Object.entries(stockList).map(([key, value]) => {
        return (
          <option value={key} key={key}>
            {value}
          </option>
        );
      })}
    </select>
  );
};

export default StockSelection;
