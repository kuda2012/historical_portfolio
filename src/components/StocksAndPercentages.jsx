import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import StockSelection from "./StockSelection";
import axios from "axios";
import moment from "moment";

const StockSelectionInputs = ({
  percentages,
  setInitialIndividualStockDollarAmount,
  initialPortfolioAmount,
  setTotalPercentages,
  date,
  initialIndividualStockDollarAmount,
  stockSymbols,
  setStockSymbols,
  setFinalIndividualStockDollarAmount,
}) => {
  const [fetchData, setFetchData] = useState(false);
  useEffect(() => {
    const arrStockSymbols = Object.values(stockSymbols);
    const arrPercentages = Object.values(percentages);
    const stockSymbolsAndPercentages = {};
    arrStockSymbols.forEach((stock, num) => {
      stockSymbolsAndPercentages[stock] = !stockSymbolsAndPercentages[stock]
        ? arrPercentages[num]
        : stockSymbolsAndPercentages[stock] + arrPercentages[num];
    });
    let urls = [];
    if (fetchData) {
      Object.entries(stockSymbolsAndPercentages).map((stock, num) => {
        if (stock[1] !== 0) {
          urls.push(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock[0]}&outputsize=full&apikey=CUZFO32ID30TEUX6`
          );
        }
      });
      Promise.all(
        urls.map((url) =>
          axios
            .get(url)
            .then((response) => response.data)
            .catch((error) => console.log(error))
        )
      ).then((data) => {
        const arrStockSymbols = Object.values(stockSymbols);
        const arrInitialIndividualStockDollarAmount = Object.values(
          initialIndividualStockDollarAmount
        );
        const stockSymbolsAndInitialIndividualStockDollarAmount = {};
        arrStockSymbols.forEach((stock, num) => {
          stockSymbolsAndInitialIndividualStockDollarAmount[stock] =
            !stockSymbolsAndInitialIndividualStockDollarAmount[stock]
              ? arrInitialIndividualStockDollarAmount[num]
              : stockSymbolsAndInitialIndividualStockDollarAmount[stock] +
                arrInitialIndividualStockDollarAmount[num];
        });
        const bigObject = Object.values(
          stockSymbolsAndInitialIndividualStockDollarAmount
        );
        data.map((stock, num) => {
          const dailyData = data[num]["Time Series (Daily)"];
          console.log(dailyData);
          const highValue = dailyData[date]["2. high"];
          setFinalIndividualStockDollarAmount((prevData) => {
            return {
              ...prevData,
              [Object.keys(stockSymbolsAndPercentages)[num]]: Number(
                (
                  (bigObject[num] / Number(highValue)) *
                  dailyData[moment().subtract(3, "days").format("YYYY-MM-DD")][
                    "2. high"
                  ]
                ).toFixed(2)
              ),
            };
          });
        });
        setFetchData(false);
      });
    }
  });
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
            <div key={num}>
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
        {fetchData && <div>(You may need to wait one minute to resubmit)</div>}
        <>
          <button
            onClick={() => {
              if (percentages.totalPercent === 100) {
                setFinalIndividualStockDollarAmount({});
                setFetchData(true);
              } else {
                alert("Percentages must add up to 100");
              }
            }}
          >
            Submit
          </button>
        </>
      </div>
    </>
  );
};

export default StockSelectionInputs;
