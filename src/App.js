import { useState } from "react";

export function Square({ onClick, value }) {
  return (
    <button className="square" onClick={onClick}>
      {" "}
      {value}{" "}
    </button>
  );
}

export function Row({ row, board, play }) {
  const squares = new Array(3)
    .fill(null)
    .map((_, colIndex) => (
      <Square
        key={colIndex}
        value={board[row][colIndex]}
        onClick={play(row, colIndex)}
      />
    ));

  return (
    <>
      <div className="board-row">{squares}</div>
    </>
  );
}

const isWinner = (board) => {
  const rows = new Array(3)
    .fill(null)
    .some(
      (_, i) =>
        board[i][1] !== null &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
    );

  const cols = new Array(3)
    .fill(null)
    .some(
      (_, i) =>
        board[0][i] !== null &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
    );

  const d =
    board[0][0] !== null &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2];

  const d1 =
    board[2][0] !== null &&
    board[1][1] === board[2][0] &&
    board[0][2] === board[1][1];

  return rows || cols || d || d1;
};

function Board() {
  const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  const [player, setPlayer] = useState(0);
  const [board, setBoard] = useState(initialBoard);

  function resetGame() {
    setBoard(initialBoard);
    setPlayer(0);
  }

  function play(row, col) {
    return function () {
      if (isWinner(board) || board[row][col]) return;
      const newBoard = board.slice();
      newBoard[row][col] = player % 2 == 0 ? "X" : "O";

      setBoard(newBoard);
      setPlayer(player + 1);
    };
  }

  const rows = new Array(3)
    .fill(null)
    .map((_, ri) => <Row key={ri} board={board} row={ri} play={play} />);

  const status = isWinner(board)
    ? `The Winner is ${player % 2 == 1 ? "X" : "O"}`
    : `Next Turn: ${player % 2 == 0 ? "X" : "O"}`;

  return (
    <>
      <div>
        {" "}
        <label> {status} </label>{" "}
      </div>
      {rows}
      <div>
        <button style={{ "margin-top": "50px" }} onClick={resetGame}>
          {" "}
          Reset
        </button>
      </div>
    </>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}
