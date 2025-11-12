import React from "react";

export default function BoxLayout({ boxes, onBoxClick, active, clicked }) {
  if (!boxes.length) {
    return <div className="hint">No boxes yet. Enter a number above.</div>;
  }

  return (
    <div className="board">
      <div className="gridArea">
        {boxes.map((on, i) => (
          <div
            key={i}
            className={`square ${on ? "green" : "red"}`}
            onClick={() => onBoxClick(i)}
          />
        ))}
      </div>
      <p className="status">
        Total: {boxes.length} | Clicked: {clicked.length} |{" "}
        {active ? "Reverting..." : "Ready"}
      </p>
    </div>
  );
}
