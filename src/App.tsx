import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "./pages/category";
import Gender from "./pages/gender";
import Home from "./pages/home";
import Style from "./stages/style/style";
import Material from "./stages/material/material";
import Color from "./stages/color/color";
import Artwork from "./stages/artwork/artwork";
import {persistor, store} from './store/index';
import { Provider } from "react-redux";
import {PersistGate} from "redux-persist/integration/react"
import CustomizeTemp from "./stages/customize/customize.temp1";
import Preview from "./stages/preview/preview";
import CustomizeContainer from "./stages/customize/customize.container";
import SceneAPI from "./bjs-components/scene/scene-api";
import { Request1 } from "./stages/request/request";
import Submit from "./pages/submit/submit";

// store.subscribe(()=> console.log(store.getState()));

function App() {
  return (
    <BrowserRouter>
     <Provider store={store}>
     <PersistGate persistor={persistor}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gender" element={<Gender />} />
        <Route path="category" element={<Category />} />
        <Route path="scene" element={<SceneAPI />} />
        <Route path="customize" element={<CustomizeContainer />}>
          <Route path="style" element={<Style/>} />
          <Route path="material" element={<Material/>} />
          <Route path="color" element={<Color/>} />
          <Route path="artwork" element={<Artwork/>} />
          <Route path="preview" element={<Preview/>} />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Route>
       
        <Route path="submit" element={<Submit/>} />
        <Route path="request" element={<Request1/>} />
      </Routes>
      </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
