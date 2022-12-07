import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/category";
import Gender from "./pages/gender";
import Home from "./pages/home";
import Scene from "./stages/scene/scene";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="gender" element={<Gender/>}/> 
        <Route path="category" element={<Category/>}/> 
        <Route path="scene" element={<Scene/>}/> 
  
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
