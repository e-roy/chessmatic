import React, { useState } from "react";
import { useContract, useSigner, useAccount } from "wagmi";
import { Button } from "@/components/elements";
import contracts from "@/contracts/hardhat_contracts.json";
import config from "../../../config.json";

export const JoinRoom = () => {
  const [{ data: signerData }] = useSigner();

  const chainId = Number(config.network.id);
  const network = config.network.name;

  const MintPlay = contracts[chainId][network].contracts.MintPlay;

  const mintPlayContract = useContract({
    addressOrName: MintPlay.address,
    contractInterface: MintPlay.abi,
    signerOrProvider: signerData,
  });

  const handleJoinRoom = async () => {
    const tx = await mintPlayContract.joinGame(0);
    await tx.wait();
    // console.log("tx.hash", tx.hash);
  };

  return (
    <div className="w-1/4 m-4 p-2 border rounded bg-stone-700 text-stone-50 border-stone-800 shadow-lg">
      <div className="flex justify-between">
        <div className="font-semibold text-lg">Team</div>
        {/* <div>black</div>

        <div>white</div> */}
      </div>
      <div className="my-4">
        <Button onClick={() => handleJoinRoom()}>Join Room</Button>
      </div>
    </div>
  );
};
