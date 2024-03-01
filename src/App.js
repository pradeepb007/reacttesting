// frontend/src/App.js
import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="py-3 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
