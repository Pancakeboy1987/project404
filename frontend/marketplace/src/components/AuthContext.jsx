import { useContext, useEffect,useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function ContextProvider({children}){
    const [userAuth, setUserAuth]=useState(null)
    const [authorised, setAuthorised]=useState(false)

    const login = (userData) =>{
        setAuthorised(true)
        setUserAuth(userData)
        

    }

    

    
      return (
        <AuthContext.Provider value={{ userAuth, login, authorised}}>
          {children}
        </AuthContext.Provider>
      );
}