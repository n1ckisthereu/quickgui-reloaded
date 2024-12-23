// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Router from "@/Router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <RouterProvider router={Router} />
  );
}

export default App;
