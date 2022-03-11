import React, { useState } from "react";
import { useContract, useSigner } from "wagmi";
import { Button } from "@/components/elements";
import contracts from "@/contracts/hardhat_contracts.json";
import config from "../../../config.json";

export default function LandingPage() {
  const [userGreeting, setUserGreeting] = useState("");
  const [{ data: signerData }] = useSigner();

  const chainId = Number(config.network.id);
  const network = config.network.name;

  const Greeter = contracts[chainId][network].contracts.Greeter;

  const greeterContract = useContract({
    addressOrName: Greeter.address,
    contractInterface: Greeter.abi,
    signerOrProvider: signerData,
  });

  const handleGetGreeting = async () => {
    const _greeting = await greeterContract.greet();
    // console.log("greeting", _greeting);
  };

  const handleSetGreeting = async () => {
    const tx = await greeterContract.setGreeting(userGreeting);
    await tx.wait();
    // console.log(tx);
  };

  return (
    <div>
      <div>landing page</div>
      <div className="m-8">
        <Button onClick={() => handleGetGreeting()}>Get Greeter</Button>
      </div>
      <div className="m-8">
        <input
          className="border p-1 my-2 rounded"
          placeholder="set greeter"
          type="text"
          value={userGreeting}
          onChange={(e) => setUserGreeting(e.target.value)}
        />
        <Button onClick={() => handleSetGreeting()}>Set Greeter</Button>
      </div>
    </div>
  );
}
