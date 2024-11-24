import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import System from "./pages/System";
import { FileExplorer } from "./pages/FileExplorer";
import Home from "./pages/Home";

export const Routing = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="files" element={<FileExplorer />} />
      <Route path="system" element={<System />} />

      {/* <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  );
};

export default Routing;
