import React, { useState } from "react";
import { useAccount } from "wagmi";
import { CreateRoom, JoinRoom } from "../../components/lobby";

import config from "../../../config.json";

export default function LobbyPage() {
  const { data: accountData } = useAccount();

  const chainId = Number(config.network.id);
  const network = config.network.name;
  // console.log("chainId", chainId);
  return (
    <div>
      <div className="text-center text-4xl drop-shadow-xl font-bold">Lobby</div>
      {accountData?.address ? (
        <>
          <CreateRoom />
          {/* <JoinRoom /> */}
        </>
      ) : (
        <div className="uppercase text-center m-16 text-xl font-semibold">
          Please connect your wallet to the Mumbai Testnet to start a game
        </div>
      )}
    </div>
  );
}
