import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage";


import './App.css'

function App() {
  
      {/*<Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
      

  </Router>
  */}
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pages/:id" element={<ProductPage />} />
      </Routes>
  </BrowserRouter>

)
}

export default App
