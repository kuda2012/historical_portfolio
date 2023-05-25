import CurrencyInput from "react-currency-input-field";
const SelectCurrency = ({ initialAmount, setInitialAmount }) => {
  return (
    <div>
      <label>Initial Balance</label>
      <CurrencyInput
        id="input-example"
        name="input-name"
        placeholder="Please enter a number"
        defaultValue={1000}
        decimalsLimit={2}
        onValueChange={(value, name) => setInitialAmount(value)}
      />
    </div>
  );
};

export default SelectCurrency;
