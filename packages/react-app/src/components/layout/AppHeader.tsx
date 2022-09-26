import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import UDomain from "./uauth.jsx";

export const AppHeader = () => {
  return (
    <header className="flex justify-between p-4">
      <div></div>
      <div>
        <ConnectButton />
        <UDomain />
      </div>
    </header>
  );
};
