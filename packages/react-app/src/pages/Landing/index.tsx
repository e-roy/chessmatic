import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/elements";
import image from "@/images/landing-chess.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="">
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
