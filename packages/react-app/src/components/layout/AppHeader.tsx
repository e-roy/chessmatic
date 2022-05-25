import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const AppHeader = () => {
  return (
    <header className="flex justify-between p-4">
      <div></div>
      <div>
        <ConnectButton />
      </div>
    </header>
  );
};
