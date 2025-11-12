import React from "react";

export default function Box({ idx, isGreen, onClick }) {
  return (
    <div
      className={`box ${isGreen ? "green" : "red"}`}
      onClick={() => onClick(idx)}
      title={`Box ${idx + 1}`}
    />
  );
}
