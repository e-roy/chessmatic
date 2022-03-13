import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContract, useSigner, useAccount } from "wagmi";
import { Button } from "@/components/elements";
import { Switch } from "@headlessui/react";
import contracts from "@/contracts/hardhat_contracts.json";
import config from "../../../config.json";
// import Web3 from "web3";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const CreateRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userColor, setUserColor] = useState(true);
  const [{ data: signerData }] = useSigner();
  const [{ data: accountData }] = useAccount();
  //   const web3 = new Web3("http://localhost:8545");

  const chainId = Number(config.network.id);
  const network = config.network.name;

  const MintPlay = contracts[chainId][network].contracts.MintPlay;

  const mintPlayContract = useContract({
    addressOrName: MintPlay.address,
    contractInterface: MintPlay.abi,
    signerOrProvider: signerData,
  });

  // const ClientReceipt = web3.eth.contract(MintPlay.abi);
  //   const ClientReceipt = new web3.eth.Contract(MintPlay.abi, MintPlay.address);

  //   useEffect(() => {
  //     const wacthEvents = async () => {
  //       const events = await ClientReceipt.getPastEvents("allEvents", {
  //         fromBlock: 0,
  //         toBlock: "latest",
  //       });
  //       console.log(events);
  //     };
  //     wacthEvents();
  //   }, []);

  // const receipt = await ClientReceipt.methods.getReceipt().call();

  const handleCreateRoom = async () => {
    setLoading(true);
    let color = true;
    if (!userColor) color = false;
    const tx = await mintPlayContract.createGame(color);
    await tx.wait();
    if (tx.hash) {
      console.log(tx);
      navigate("/chess");
      setLoading(false);
    }
    // console.log("tx.hash", tx.hash);
  };

  return (
    <div className="flex w-1/4 m-4 p-4 h-32 border rounded bg-stone-700 text-stone-50 border-stone-800 shadow-lg">
      {loading ? (
        <div className="text-xl text-center uppercase m-auto">
          creating game...
        </div>
      ) : (
        <>
          {/* <div className="flex justify-between">
            <div className="font-semibold text-lg">Team</div>
            <div>black</div>
            <Switch
              checked={userColor}
              onChange={setUserColor}
              className={classNames(
                userColor ? "bg-stone-100" : "bg-stone-900",
                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={classNames(
                  userColor ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                )}
              />
            </Switch>

            <div>white</div>
          </div> */}
          <div className="my-4 mx-auto">
            <Button onClick={() => handleCreateRoom()}>Create Room</Button>
          </div>
        </>
      )}
    </div>
  );
};
