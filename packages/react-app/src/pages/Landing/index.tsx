import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useSigner } from "wagmi";
import { Button } from "@/components/elements";
import contracts from "@/contracts/hardhat_contracts.json";
import config from "../../../config.json";
import image from "@/images/landing-chess.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [userGreeting, setUserGreeting] = useState("");
  const [{ data: signerData }] = useSigner();

  const chainId = Number(config.network.id);
  const network = config.network.name;

  const Greeter = contracts[chainId][network].contracts.Greeter;

  // console.log("Greeter", Greeter);

  const greeterContract = useContract({
    addressOrName: Greeter.address,
    contractInterface: Greeter.abi,
    signerOrProvider: signerData,
  });

  return (
    <div className="">
      {/* <div className="text-center text-4xl drop-shadow-xl font-bold">
        ChessMatic
      </div> */}

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-24 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <h1 className="font-roboto-slab text-4xl sm:text-6xl drop-shadow-xl font-bold leading-tight mt-4">
            ChessMatic
          </h1>

          <div className="max-w-md">
            <p className="font-source-sans-pro text-stone-100 mt-6 text-xl">
              Create and Play Chess on the <br /> Polygon Blockchain
            </p>
          </div>

          <div className="my-8">
            <Button onClick={() => navigate("/lobby")}>Go To Lobby</Button>
          </div>
        </div>
        <div className="-m-32 ml-8 mr-1">
          <img src={image} alt="chessmatic" />
        </div>
      </div>
    </div>
  );
}
