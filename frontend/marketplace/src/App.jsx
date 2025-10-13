import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext, AuthContext } from './components/Contexts';

import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage";


import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);



  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/:id" element={<ProductPage />} />
        </Routes>
    </BrowserRouter>
  </ThemeContext.Provider>

)
}

export default App
