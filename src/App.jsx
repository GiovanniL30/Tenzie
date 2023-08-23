import React from "react";
import { useState, useEffect } from "react";
import blockData from "./blockData";
import Block from "./Block";

export default function App() {
  const [blocksData, setBlocksData] = useState(blockData);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setNewDiceValues();
  }, []);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rollDice() {
    setNewDiceValues();
  }

  function checkWin() {
    const referenceValue = blocksData[0].value;

    for (let i = 1; i < blocksData.length; i++) {
      if (blocksData[i].value !== referenceValue) {
        return false;
      }
    }

    return true;
  }

  function setNewDiceValues() {
    setBlocksData((prevData) => {
      return prevData.map((block) => {
        return !block.isPressed
          ? {
              ...block,
              value: generateRandomNumber(),
            }
          : block;
      });
    });
  }

  function toggle(id) {
    setBlocksData((prevData) => {
      const updatedData = [];
      for (let i = 0; i < prevData.length; i++) {
        let currentBlock = prevData[i];
        if (id === currentBlock.id) {
          currentBlock = {
            ...currentBlock,
            isPressed: !currentBlock.isPressed,
          };
          updatedData.push(currentBlock);
        } else {
          updatedData.push(currentBlock);
        }
      }
      return updatedData;
    });

    if (checkWin()) {
      setGameOver(true);
    }
  }

  const blocks = blocksData.map((block) => {
    return (
      <Block
        isPressed={block.isPressed}
        key={block.id}
        value={block.value}
        onClick={() => toggle(block.id)}
      />
    );
  });

  return (
    <div className="parent">
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="container">{blocks}</div>{" "}
      <button className="rollBtn" onClick={rollDice}>
        Roll
      </button>
      {gameOver && (
        <div onClick={() => location.reload()} className="overlay">
          You Win
        </div>
      )}
    </div>
  );
}
