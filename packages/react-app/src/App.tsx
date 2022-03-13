import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { AppHeader } from "./components/layout";

import { LandingPage, DevPage, ChessPage, LobbyPage } from "./pages";

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
    <div className="bg-gradient-to-t from-stone-500 to-stone-400 text-stone-50 h-screen">
      <AppHeader />
      <main className="m-4">
        <Outlet />
      </main>
    </div>
  );
};
