import React, { useState } from "react";
// import Chessboard from "chessboardjsx";
import { Button } from "@/components/elements";
import { Chess } from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";

export default function ChessPage() {
  const [chess, setChess] = useState(new Chess());
  const [pendingMove, setPendingMove] = useState();
  const [selectVisible, setSelectVisible] = useState(false);
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const handleReset = () => {
    console.log("reset");
  };
  //   console.log("chess", Chess);
  // const chessThing = new Chess();

  const onMove = (from, to) => {
    console.log("onMove", from, to);
    const moves = chess.moves({ verbose: true });
    for (let i = 0, len = moves.length; i < len; i++) {
      /* eslint-disable-line */
      if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
        setPendingMove([from, to]);
        setSelectVisible(true);
        return;
      }
    }
    if (chess.move({ from, to, promotion: "x" })) {
      setFen(chess.fen());
      setLastMove([from, to]);
      setTimeout(randomMove, 500);
    }
  };

  const randomMove = () => {
    const moves = chess.moves({ verbose: true });
    const move = moves[Math.floor(Math.random() * moves.length)];
    if (moves.length > 0) {
      chess.move(move.san);
      setFen(chess.fen());
      setLastMove([move.from, move.to]);
    }
  };

  const promotion = (e) => {
    const from = pendingMove[0];
    const to = pendingMove[1];
    chess.move({ from, to, promotion: e });
    setFen(chess.fen());
    setLastMove([from, to]);
    setSelectVisible(false);
    setTimeout(randomMove, 500);
  };

  const turnColor = () => {
    return chess.turn() === "w" ? "white" : "black";
  };

  const calcMovable = () => {
    const dests = new Map();
    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    return {
      free: false,
      dests,
      color: "white",
    };
  };

  return (
    <div>
      {/* <div>chess page</div> */}
      {/* <Chessboard position="start" /> */}
      <Chessground
        // width="60vw"
        // height="60vw"
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={lastMove}
        fen={fen}
        onMove={onMove}
        style={{ margin: "auto" }}
      />
      <div className="m-8">
        <Button onClick={() => handleReset()}>reset</Button>
      </div>
    </div>
  );
}
