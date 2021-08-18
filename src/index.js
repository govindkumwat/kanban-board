import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard } from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { Header } from "./Header";
import './index.css'

const board = {
  columns: [
    {
      id: 1,
      title: "Assigned",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Ongoing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "To be tested",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Completed",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  // Note: To enable user to create a new column all the following are needed as a minimum

  /** This is called by onColumnNew on the board when a new column has been requested and 
  the form on the ColumnAdder component has been filled in by the user. We update our state
  to get the board to render with the new data */
  const handleColumnAdded = (newBoard, newColumn) => {
    console.info("column added!");
    setBoard(newBoard);
  };

  /** This is called when a new column has been requested, its main job is 
   to give you a chance to save it and return a new id for the column */
  const handleColumnConfirmed = (newColumnName) => {
    console.info("Column id requested");
    // You will need to generate a new id for you column here - id from a database insert or similar?
    const newColumn = {
      id: "testing-but-this-should-be-unique",
      ...newColumnName
    };
    return newColumn;
  };

  return (
    <Board
      onCardDragEnd={handleCardMove}
      disableColumnDrag
      allowAddColumn={true}
      onNewColumnConfirm={handleColumnConfirmed}
      onColumnNew={handleColumnAdded}
    >
      {controlledBoard}
    </Board>
  );
}

function UncontrolledBoard() {
  return (
    <Board
      allowRemoveLane
      allowRenameColumn
      allowRemoveCard
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      allowAddCard={{ on: "top" }}
      onNewCardConfirm={(draftCard) => ({
        id: new Date().getTime(),
        ...draftCard
      })}
      onCardNew={console.log}
    />
  );
}

function App() {
  return (
    <>
      <Header/>
      <UncontrolledBoard />
      
      
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
