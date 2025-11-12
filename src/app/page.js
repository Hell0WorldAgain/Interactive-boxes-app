"use client";
import React, { useState, useRef, useEffect } from "react";
import InputForm from "../components/InputForm";
import BoxGrid from "../components/BoxGrid";
import "../styles/Boxes.css";

export default function HomePage() {
  const [n, setN] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [clickOrder, setClickOrder] = useState([]);
  const [isReverting, setIsReverting] = useState(false);
  const revertIntervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (revertIntervalRef.current) clearInterval(revertIntervalRef.current);
    };
  }, []);

  const handleGenerate = (num) => {
    setN(num);
    setBoxes(Array(num).fill(false));
    setClickOrder([]);
    setIsReverting(false);
    if (revertIntervalRef.current) {
      clearInterval(revertIntervalRef.current);
      revertIntervalRef.current = null;
    }
  };

  const handleBoxClick = (idx) => {
    if (isReverting) return;

    if (!boxes[idx]) {
      const updated = [...boxes];
      updated[idx] = true;
      const newOrder = [...clickOrder, idx];
      setBoxes(updated);
      setClickOrder(newOrder);

      if (newOrder.length === updated.length) {
        startRevert(newOrder);
      }
    }
  };

  const startRevert = (order) => {
    if (!order || order.length === 0) return;
    setIsReverting(true);
    const toRevert = [...order];

    revertIntervalRef.current = setInterval(() => {
      if (toRevert.length === 0) {
        clearInterval(revertIntervalRef.current);
        revertIntervalRef.current = null;
        setIsReverting(false);
        setClickOrder([]);
        return;
      }
      const last = toRevert.pop();
      setBoxes((prev) => {
        const copy = [...prev];
        copy[last] = false;
        return copy;
      });
    }, 1000);
  };

  return (
    <div className="container">
      <h1 className="title">Responsive Boxes App</h1>

      <InputForm onGenerate={handleGenerate} />

      <BoxGrid
        boxes={boxes}
        onClick={handleBoxClick}
        isReverting={isReverting}
        clickOrder={clickOrder}
      />
    </div>
  );
}
