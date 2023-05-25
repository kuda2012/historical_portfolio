import React, { useState, useEffect } from "react";
import axios from "axios";

const DataFetchingComponent = ({ date, symbol }) => {
  const [highValue, setHighValue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("date", date, " symbol", symbol);
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=CUZFO32ID30TEUX6`
        );
        // console.log('Here is respone',response);
        const data = response.data;
        // console.log("Here is fetchedData", data);
        const dailyData = data["Time Series (Daily)"];
        console.log(dailyData);
        const highValue = dailyData[date]["2. high"];
        setHighValue(highValue);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {highValue ? (
        <p>
          Value of {symbol} at {date} is : ${highValue}
        </p>
      ) : (
        <p>
          No data available for {symbol} at {date}
        </p>
      )}
    </div>
  );
};

export default function FetchSymbol({ date, symbol }) {
  return (
    <div>
      <DataFetchingComponent date={date} symbol={symbol} />
    </div>
  );
}
