import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";

import { AppHeader } from "./components/layout";

import { LandingPage, DevPage, ChessPage } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/chess" element={<ChessPage />} />
      </Route>
    </Routes>
  );
}

export default App;

const AppLayout = () => {
  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
