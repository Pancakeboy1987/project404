import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from './components/Contexts';
import AuthContext from './components/AuthContext';

import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage";
import Profile from './pages/Profile';


import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [userAuth, setUserAuth] = useState('')
  
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);

  }, [theme]);



  return (
    <AuthContext>
    <ThemeContext.Provider value={{theme, setTheme}}>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/:id" element={<ProductPage />} />
        <Route path="/pages/profile" element={<Profile />} />
        </Routes>
    </BrowserRouter>
    
  </ThemeContext.Provider>
  </AuthContext>

)
}

export default App
