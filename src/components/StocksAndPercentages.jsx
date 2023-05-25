import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import StockSelection from "./StockSelection";
import axios from "axios";

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
    let urls = [];
    if (fetchData) {
      Object.keys(stockSymbols).map((stock, num) => {
        urls.push(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbols[stock]}&outputsize=compact&apikey=CUZFO32ID30TEUX6`
        );
      });
      Promise.all(
        urls.map((url) =>
          axios
            .get(url)
            .then((response) => response.data)
            .catch((error) => console.log(error))
        )
      ).then((data) => {
        data.map((stock, num) => {
          const dailyData = data[num]["Time Series (Daily)"];
          // console.log(dailyData);
          const highValue = dailyData[date]["2. high"];
          console.log(date, highValue);
          setFinalIndividualStockDollarAmount((prevData) => {
            return {
              ...prevData,
              [stockSymbols["stock".concat(num)]]: Number(
                (
                  (initialIndividualStockDollarAmount["value".concat(num)] /
                    Number(highValue)) *
                  dailyData["2023-05-25"]["2. high"]
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
        <button
          onClick={() => {
            if (percentages.totalPercent === 100) {
              setFetchData(true);
            }
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default StockSelectionInputs;
