import { useContext,useEffect} from "react";
import { createContext } from "react";
import { useState } from "react";


export const ThemeContext = createContext(null)


export default function ContextProvider({children}){
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
      }, [theme]);

    useEffect(()=>{
        const savedLight = localStorage.getItem('light')
        const savedDark = localStorage.getItem('dark')
        if (savedLight){
            setTheme('light')
        }if (savedDark){
            setTheme('dark')
        }
    },[]);



    function changeLight(theme){
        if (theme=='light'){
            localStorage.setItem('light','true')
            localStorage.removeItem('dark')
        }if (theme=='dark'){
            localStorage.setItem('dark','true')
            localStorage.removeItem('light')
            
        }
      }





      return(
        <ThemeContext.Provider value={{ theme, setTheme,changeLight }}>
            {children}
        </ThemeContext.Provider>
      )
}
