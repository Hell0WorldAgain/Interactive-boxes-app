import React, { useState } from "react";

export default function InputField({ onCreate }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const checkValue = (num) => {
    const n = Number(num);
    if (isNaN(n)) return "Please type a number.";
    if (!Number.isInteger(n)) return "Only full numbers are allowed.";
    if (n < 5 || n > 25) return "Pick a number between 5 and 25.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = checkValue(value);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    onCreate(Number(value));
  };

  return (
    <form className="formBar" onSubmit={handleSubmit}>
      <label>How many boxes?</label>
      <input
        type="number"
        min="5"
        max="25"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. 10"
      />
      <button type="submit">Make</button>
      {error && <div className="warn">{error}</div>}
    </form>
  );
}
