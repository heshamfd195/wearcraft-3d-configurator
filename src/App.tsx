import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/category";
import Gender from "./pages/gender";
import Home from "./pages/home";
import Customize from "./stages/customize/customize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gender" element={<Gender />} />
        <Route path="category" element={<Category />} />
        <Route path="customize" element={<Customize />}>
          <Route path="style" element={<h1>Style Stage</h1>} />
          <Route path="material" element={<h1>Material Stage</h1>} />
          <Route path="color" element={<h1>Color Stage</h1>} />
          <Route path="artwork" element={<h1>Artwork Stage</h1>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
