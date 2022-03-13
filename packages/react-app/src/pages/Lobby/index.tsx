import React, { useState } from "react";
import { useContract, useSigner, useAccount } from "wagmi";
import { Button } from "@/components/elements";
import { CreateRoom, JoinRoom } from "@/components/lobby";

import contracts from "@/contracts/hardhat_contracts.json";
import config from "../../../config.json";

export default function LobbyPage() {
  const [userGreeting, setUserGreeting] = useState("");
  const [{ data: signerData }] = useSigner();
  const [{ data: accountData }] = useAccount();

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
          Please connect your wallet to start a game
        </div>
      )}
    </div>
  );
}
