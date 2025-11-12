import React from "react";
import Box from "./Box";

export default function BoxGrid({ boxes, onClick, isReverting, clickOrder }) {
  if (!boxes || boxes.length === 0)
    return <p className="status">No boxes generated yet.</p>;

  return (
    <div className="grid">
      {boxes.map((isGreen, idx) => (
        <Box key={idx} idx={idx} isGreen={isGreen} onClick={onClick} />
      ))}

      <div className="status">
        Boxes: {boxes.length} — Clicked: {clickOrder.length} —{" "}
        {isReverting ? "Reverting..." : "Ready"}
      </div>
    </div>
  );
}
