"use client";
import React, { useState, useRef, useEffect } from "react";
import InputField from "../components/InputField";
import BoxLayout from "../components/BoxLayout";
import "../styles/main.css";

export default function Home() {
  const [total, setTotal] = useState(null);
  const [squares, setSquares] = useState([]);
  const [clicks, setClicks] = useState([]);
  const [resetting, setResetting] = useState(false);
  const timerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => timerRef.current && clearInterval(timerRef.current);
  }, []);

  const makeSquares = (count) => {
    setTotal(count);
    setSquares(Array(count).fill(false));
    setClicks([]);
    setResetting(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const toggleSquare = (i) => {
    if (resetting) return; // don't allow clicks while it's reverting

    // Only react if this one is still red
    if (!squares[i]) {
      const updated = [...squares];
      updated[i] = true;
      const newList = [...clicks, i];
      setSquares(updated);
      setClicks(newList);

      // If all have turned green, start reverting process
      if (newList.length === updated.length) startReverse(newList);
    }
  };

  const startReverse = (order) => {
    if (!order.length) return;
    setResetting(true);

    const back = [...order];
    timerRef.current = setInterval(() => {
      if (!back.length) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setResetting(false);
        setClicks([]);
        return;
      }

      const last = back.pop();
      setSquares((prev) => {
        const copy = [...prev];
        copy[last] = false;
        return copy;
      });
    }, 1000);
  };

  return (
    <div className="wrapper">
      <h1 className="heading">Click Boxes Playground</h1>

      <InputField onCreate={makeSquares} />

      <BoxLayout
        boxes={squares}
        onBoxClick={toggleSquare}
        active={resetting}
        clicked={clicks}
      />
    </div>
  );
}
