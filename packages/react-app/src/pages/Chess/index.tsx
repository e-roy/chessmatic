import React, { useEffect, useState } from "react";
import { Button, Modal } from "../../components/elements";

import { MainBoard } from "../../components/board";

import { Chess } from "chess.js";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
// import "./custom-chessground.css";
import queen from "../../images/wQ.svg";
import rook from "../../images/wR.svg";
import bishop from "../../images/wB.svg";
import knight from "../../images/wN.svg";

import { useContract, useSigner, useAccount } from "wagmi";
import contracts from "../../contracts/hardhat_contracts.json";
import config from "../../../config.json";

export default function ChessPage() {
  const [chess, setChess] = useState(new Chess());
  const [pendingMove, setPendingMove] = useState();
  const [selectVisible, setSelectVisible] = useState(false);
  const [fen, setFen] = useState("");
  const [lastMove, setLastMove] = useState();
  const [userMoveComplete, setUserMoveComplete] = useState(false);

  const { data: signerData } = useSigner();
  const { data: accountData } = useAccount();

  const chainId = Number(config.network.id);
  const network = config.network.name;

  // console.log(contracts);

  const MintPlay = contracts[chainId][network].contracts.MintPlay;

  const mintPlayContract = useContract({
    addressOrName: MintPlay.address,
    contractInterface: MintPlay.abi,
    signerOrProvider: signerData,
  });
  // console.log(mintPlayContract);

  // console.log("contracts", contracts[chainId][network].contracts);

  useEffect(() => {
    if (fen && userMoveComplete) {
      console.log("setBoard transaction");
      const setBoard = async () => {
        const tx = await mintPlayContract.makeMove(0, fen);
        await tx.wait();
        setUserMoveComplete(false);
      };
      setBoard();
    }
  }, [fen]);

  useEffect(() => {
    if (mintPlayContract.signer) {
      // console.log("getting board data");
      const getBoard = async () => {
        const _board = await mintPlayContract.getGameDetails(0);
        // console.log("_board", _board[5]);
        setFen(_board[5]);
        setChess(new Chess(_board[5]));
      };
      getBoard();
    }
  }, [mintPlayContract]);

  const handleReset = () => {
    chess.reset();
    console.log(chess.fen());
    setFen(chess.fen());
  };

  const handleCheck = () => {
    console.log("check");
    console.log(chess.board());
    console.log("fen", chess.fen());
    console.log("history", chess.history());
    console.log("history verbose", chess.history({ verbose: true }));
    console.log("ascii", chess.ascii());
    console.log("comments", chess.get_comments());
    console.log("header", chess.header());
  };

  const handleComment = () => {
    chess.set_comment("this is something here");
  };

  const handleTestMintContract = async () => {
    console.log(accountData?.address);
    console.log("mintPlayContract", mintPlayContract);
    const tx = await mintPlayContract.allGames(0);
    // const tx = await mintPlayContract.symbol();
    // // await tx.wait();
    console.log(tx);

    // const tx2 = await mintPlayContract.safeMint(accountData?.address);
    // await tx2.wait();
    // console.log(tx2);
    const tx2 = await mintPlayContract.getGameDetails(0);
    // await tx2.wait();
    console.log(tx2);

    const tx3 = await mintPlayContract.allGames;
    console.log(tx3);
    // const tx4 = await mintPlayContract.getOpenGames();
    // console.log(tx4);
  };

  const onMove = (from, to) => {
    setUserMoveComplete(true);
    // console.log(from, to);
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
    <div className="p-2">
      <Chessground
        // width="100%"
        // height="100%"
        addPieceZIndex={true}
        addDimensionsCssVars={true}
        turnColor={turnColor()}
        movable={calcMovable()}
        lastMove={lastMove}
        fen={fen}
        onMove={onMove}
        style={{ margin: "auto" }}
      />
      {/* <div className="m-8">
        <Button onClick={() => handleReset()}>reset</Button>
      </div>
      <div className="m-8">
        <Button onClick={() => handleCheck()}>check board data</Button>
      </div>
      <div className="m-8">
        <Button onClick={() => handleComment()}>add comment</Button>
      </div>
      <div className="m-8">
        <Button onClick={() => handleTestMintContract()}>mint contract</Button>
      </div> */}

      <Modal isOpen={selectVisible} onClose={() => setSelectVisible(false)}>
        <div
          style={{ textAlign: "center", cursor: "pointer" }}
          className="bg-white p-1 flex justify-between"
        >
          <span
            className="hover:bg-slate-400 p-2 rounded"
            role="presentation"
            onClick={() => promotion("q")}
          >
            <img src={queen} alt="" style={{ width: 50 }} />
          </span>
          <span
            className="hover:bg-slate-400 p-2 rounded"
            role="presentation"
            onClick={() => promotion("r")}
          >
            <img src={rook} alt="" style={{ width: 50 }} />
          </span>
          <span
            className="hover:bg-slate-400 p-2 rounded"
            role="presentation"
            onClick={() => promotion("b")}
          >
            <img src={bishop} alt="" style={{ width: 50 }} />
          </span>
          <span
            className="hover:bg-slate-400 p-2 rounded"
            role="presentation"
            onClick={() => promotion("n")}
          >
            <img src={knight} alt="" style={{ width: 50 }} />
          </span>
        </div>
      </Modal>
    </div>
  );
}
