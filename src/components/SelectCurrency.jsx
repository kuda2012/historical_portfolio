import CurrencyInput from "react-currency-input-field";
const SelectCurrency = ({
  initialPortfolioAmount,
  setInitialPortfolioAmount,
}) => {
  return (
    <div>
      <label>Initial Balance</label>
      <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        defaultValue={initialPortfolioAmount}
        decimalsLimit={2}
        onValueChange={(value) => {
          setInitialPortfolioAmount(Number(value));
        }}
      />
    </div>
  );
};

export default SelectCurrency;
