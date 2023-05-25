import React, { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import StockSelection from "./StockSelection";

const StockSelectionInputs = ({
  percentages,
  setInitialIndividualStockDollarAmount,
  initialPortfolioAmount,
  setTotalPercentages,
  stockSymbols,
  setStockSymbols,
}) => {
  return (
    <>
      <h3>
        Portfolio Allocation (must add up to 100):
        <span
          style={{ color: percentages.totalPercent > 100 ? "red" : "black" }}
        >
          {" "}
          {percentages.totalPercent}%
        </span>
      </h3>
      <div>
        <div>
          <StockSelection
            stockSymbols={stockSymbols}
            setStockSymbols={setStockSymbols}
            order={1}
          />
          <NumericFormat
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue <= 100;
            }}
            onValueChange={(values) => {
              setInitialIndividualStockDollarAmount((prevAmounts) => {
                return {
                  ...prevAmounts,
                  value1:
                    (values.floatValue * initialPortfolioAmount) / 100
                      ? (values.floatValue * initialPortfolioAmount) / 100
                      : 0,
                };
              });
              setTotalPercentages((prevPercentages) => {
                return {
                  ...prevPercentages,
                  value1:
                    values.floatValue !== undefined ? values.floatValue : 0,
                  totalPercent:
                    values.floatValue !== undefined
                      ? values.floatValue +
                        prevPercentages.value2 +
                        prevPercentages.value3 +
                        prevPercentages.value4
                      : prevPercentages.value2 +
                        prevPercentages.value3 +
                        prevPercentages.value4,
                };
              });
            }}
          />
        </div>
        <div>
          <StockSelection
            stockSymbols={stockSymbols}
            setStockSymbols={setStockSymbols}
            order={2}
          />
          <NumericFormat
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue <= 100;
            }}
            onValueChange={(values) => {
              setInitialIndividualStockDollarAmount((prevAmounts) => {
                return {
                  ...prevAmounts,
                  value2:
                    (values.floatValue * initialPortfolioAmount) / 100
                      ? (values.floatValue * initialPortfolioAmount) / 100
                      : 0,
                };
              });
              setTotalPercentages((prevPercentages) => {
                return {
                  ...prevPercentages,
                  value2:
                    values.floatValue !== undefined ? values.floatValue : 0,
                  totalPercent:
                    values.floatValue !== undefined
                      ? values.floatValue +
                        prevPercentages.value1 +
                        prevPercentages.value3 +
                        prevPercentages.value4
                      : prevPercentages.value1 +
                        prevPercentages.value3 +
                        prevPercentages.value4,
                };
              });
            }}
          />
        </div>
        <div>
          <StockSelection
            stockSymbols={stockSymbols}
            setStockSymbols={setStockSymbols}
            order={3}
          />
          <NumericFormat
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue <= 100;
            }}
            onValueChange={(values) => {
              setInitialIndividualStockDollarAmount((prevAmounts) => {
                return {
                  ...prevAmounts,
                  value3:
                    (values.floatValue * initialPortfolioAmount) / 100
                      ? (values.floatValue * initialPortfolioAmount) / 100
                      : 0,
                };
              });
              setTotalPercentages((prevPercentages) => {
                return {
                  ...prevPercentages,
                  value3:
                    values.floatValue !== undefined ? values.floatValue : 0,
                  totalPercent:
                    values.floatValue !== undefined
                      ? values.floatValue +
                        prevPercentages.value1 +
                        prevPercentages.value2 +
                        prevPercentages.value4
                      : prevPercentages.value1 +
                        prevPercentages.value2 +
                        prevPercentages.value4,
                };
              });
            }}
          />
        </div>
        <div>
          <StockSelection
            stockSymbols={stockSymbols}
            setStockSymbols={setStockSymbols}
            order={4}
          />
          <NumericFormat
            isAllowed={(values) => {
              const { formattedValue, floatValue } = values;
              return formattedValue === "" || floatValue <= 100;
            }}
            onValueChange={(values) => {
              setInitialIndividualStockDollarAmount((prevAmounts) => {
                return {
                  ...prevAmounts,
                  value4:
                    (values.floatValue * initialPortfolioAmount) / 100
                      ? (values.floatValue * initialPortfolioAmount) / 100
                      : 0,
                };
              });
              setTotalPercentages((prevPercentages) => {
                return {
                  ...prevPercentages,
                  value4:
                    values.floatValue !== undefined ? values.floatValue : 0,
                  totalPercent:
                    values.floatValue !== undefined
                      ? values.floatValue +
                        prevPercentages.value1 +
                        prevPercentages.value2 +
                        prevPercentages.value3
                      : prevPercentages.value1 +
                        prevPercentages.value2 +
                        prevPercentages.value3,
                };
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default StockSelectionInputs;
