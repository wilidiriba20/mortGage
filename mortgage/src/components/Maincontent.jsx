import { useState } from "react";

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
  
  return (
    <>
    <InputField label="Purchase Price" currency="$" min={0} max={10000000} value={0} onChange={() => {}} />
    </>
  );
}

export default Maincontent;
