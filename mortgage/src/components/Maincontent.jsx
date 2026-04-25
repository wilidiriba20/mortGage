import { useState } from "react";
const calculateLoanAmount = (purchasePrice, downPayment) => {
  return Math.max(purchasePrice - downPayment, 0);
};
const calculateMonthlyPayment = (loanAmount, interestRate, loanTerm) => {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  if (loanAmount <= 0 || numberOfPayments <= 0) return 0;

  if (monthlyRate === 0) {
    return loanAmount / numberOfPayments;
  }

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return monthlyPayment;
};
function InputField({
  label,
  currency,
  min,
  max,
  year,
  rate,
  step = 1,
  value,
  onChange,
}) {
  const handleInputChange = (e) => {
    let val = e.target.value;

    val = val.replace(/,/g, "");

    if (val === "") {
      onChange("");
      return;
    }

    if (!isNaN(val)) {
      onChange(Number(val));
    }
  };

  const handleBlur = () => {
    const numValue = Number(value);
    if (numValue < min) onChange(min);
    if (numValue > max) onChange(max);
  };
  const formatNumber = (num) => {
    if (num === "" || num === null) return "";
    return Number(num).toLocaleString();
  };

  return (
    <div className="input-container">
      <label>{label}</label>
      <div className="input-wrapper">
        <span className="currency">{year || rate || currency}</span>
        <input
          type="text"
          value={formatNumber(value)}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value === "" ? min : value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

function Maincontent() {
  const [currency, setCurrency] = useState("etb");
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [downPayment, setDownPayment] = useState(0); // Set to min to avoid jump
  const [loanTerm, setLoanTerm] = useState(1);
  const [interestRate, setInterestRate] = useState(0);
  const loanAmount = calculateLoanAmount(purchasePrice, downPayment);

  const monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    interestRate,
    loanTerm,
  );

  return (
    <div className="main-content">
      <div className="container">
        <div className="left">
          <div className="top">
            <h3>YOUR DETAILS</h3>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="etb">etb</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </select>
          </div>
          <div className="down">
            <InputField
              label="Purchase Price"
              currency={currency}
              min={0}
              max={1000000}
              step={1000}
              value={purchasePrice}
              onChange={setPurchasePrice}
            />
            <InputField
              label="Down Payment"
              currency={currency}
              min={0}
              max={1000000}
              step={1000}
              value={downPayment}
              onChange={setDownPayment}
            />
            <InputField
              label="Loan Term"
              year="years"
              min={1}
              max={30}
              step={1}
              value={loanTerm}
              onChange={setLoanTerm}
            />
            <InputField
              label="Interest Rate"
              rate="%"
              min={0}
              max={100}
              step={0.1}
              value={interestRate}
              onChange={setInterestRate}
            />
          </div>
        </div>
        <div className="right">
          <h5>ESTIMATED RESULTS</h5>
          <div className="results">
            <div className="result-box">
              <p>
                Loan Amount :
                {loanAmount.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <div className="result-box">
              <p>
                Monthly Payment:
                {monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maincontent;
