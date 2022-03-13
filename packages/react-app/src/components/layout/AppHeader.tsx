import React from "react";
import { ConnectWallet } from "@/components/wallet";

export const AppHeader = () => {
  return (
    <header className="flex justify-between p-4">
      <div></div>
      <div>
        <ConnectWallet />
      </div>
    </header>
  );
};
