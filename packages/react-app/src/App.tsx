import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { AppHeader } from "./components/layout";

import { LandingPage, DevPage, ChessPage, LobbyPage } from "./pages";

import { IS_PRODUCTION, IS_DEVELOPMENT } from "@/constants";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/chess" element={<ChessPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  return (
    <div className="bg-gradient-to-t from-stone-600 to-stone-400 text-stone-50 h-screen flex flex-col">
      <AppHeader />
      <main className="m-4 flex-grow">
        <Outlet />
      </main>
      <footer className="text-center text-md text-stone-100">
        {IS_PRODUCTION && (
          <div className="border h-8 border-stone-900 bg-stone-800 pt-1 uppercase font-bold">
            production
          </div>
        )}
        {IS_DEVELOPMENT && (
          <div className="border h-8 border-purple-700 bg-purple-600 pt-1 uppercase font-bold">
            development
          </div>
        )}
      </footer>
    </div>
  );
};
