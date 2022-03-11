import React from "react";
import { ConnectWallet } from "@/components/wallet";

export const AppHeader = () => {
  return (
    <header className="flex justify-between border p-2">
      <div>logo</div>
      <div>
        <ConnectWallet />
      </div>
    </header>
  );
};
