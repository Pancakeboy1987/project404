import { useContext, useEffect,useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function ContextProvider({children}){
    const [userAuth, setUserAuth]=useState(null)
    const [authorised, setAuthorised]=useState(false)

    useEffect(() => {
      const savedUser = localStorage.getItem("userAuth");
      const savedAuth = localStorage.getItem("authorised");
      
      if (savedUser && savedAuth === "true") {
        setUserAuth(JSON.parse(savedUser));
        setAuthorised(true);
      }
``
    }, []);

    

    function login(userData){
        setAuthorised(true)
        setUserAuth(userData)
        console.log(userData)

        localStorage.setItem("userAuth", JSON.stringify(userData));
        localStorage.setItem("authorised", "true");

    }

    function logout(){
      setAuthorised(false);
      setUserAuth(null);
  
      localStorage.removeItem("userAuth");
      localStorage.removeItem("authorised");
    }



    
      return (
        <AuthContext.Provider value={{ userAuth, login, logout, authorised,setUserAuth,setAuthorised}}>
          {children}
        </AuthContext.Provider>
      );
}