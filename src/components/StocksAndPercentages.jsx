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
        {Object.keys(stockSymbols).map((stock, num) => {
          return (
            <div>
              <StockSelection
                stockSymbols={stockSymbols}
                setStockSymbols={setStockSymbols}
                order={num}
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
                      ["value".concat(num)]:
                        (values.floatValue * initialPortfolioAmount) / 100
                          ? (values.floatValue * initialPortfolioAmount) / 100
                          : 0,
                    };
                  });
                  setTotalPercentages((prevPercentages) => {
                    let totalSum =
                      values.floatValue +
                      prevPercentages.value0 +
                      prevPercentages.value1 +
                      prevPercentages.value2 +
                      prevPercentages.value3 -
                      prevPercentages["value".concat(num)];
                    return {
                      ...prevPercentages,
                      ["value".concat(num)]:
                        values.floatValue !== undefined ? values.floatValue : 0,
                      totalPercent:
                        values.floatValue !== undefined
                          ? values.floatValue +
                            prevPercentages.value0 +
                            prevPercentages.value1 +
                            prevPercentages.value2 +
                            prevPercentages.value3 -
                            prevPercentages["value".concat(num)]
                          : prevPercentages.value0 +
                            prevPercentages.value1 +
                            prevPercentages.value2 +
                            prevPercentages.value3 -
                            prevPercentages["value".concat(num)],
                    };
                  });
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StockSelectionInputs;
