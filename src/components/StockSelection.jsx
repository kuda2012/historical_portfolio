import { stockList } from "../assets/stockList";

const StockSelection = () => {
  return (
    <select name="selectedFruit">
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
