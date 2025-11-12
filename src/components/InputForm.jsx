import React, { useState } from "react";

export default function InputForm({ onGenerate }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const validate = (value) => {
    const parsed = Number(value);
    if (isNaN(parsed)) return "Enter a numeric value.";
    if (!Number.isInteger(parsed)) return "Enter an integer.";
    if (parsed < 5 || parsed > 25) return "Value must be between 5 and 25.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(inputValue);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onGenerate(Number(inputValue));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="boxCount">Number of boxes (5–25): </label>
      <input
        id="boxCount"
        type="number"
        min="5"
        max="25"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Generate</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
