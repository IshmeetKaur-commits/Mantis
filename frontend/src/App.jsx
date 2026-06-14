import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import UploadPage from "./pages/UploadPage";

function App() {
  const [darkMode, setDarkMode] =
    useState(true);

  return (
    <BrowserRouter>

      <div
        className={
          darkMode
            ? "bg-slate-950 text-white min-h-screen"
            : "bg-slate-100 text-slate-900 min-h-screen"
        }
      >

        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="ml-72">

          <Routes>
            <Route
              path="/"
              element={
                <Home darkMode={darkMode} />
              }
            />

            <Route
              path="/product/:id"
              element={
                <ProductDetails
                  darkMode={darkMode}
                />
              }
            />

            <Route
              path="/upload"
              element={
                <UploadPage
                  darkMode={darkMode}
                />
              }
            />
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;