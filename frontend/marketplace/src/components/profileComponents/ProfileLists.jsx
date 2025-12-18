import React from "react";
import '../ListingCard.css'
import {Link} from "react-router-dom"
import { useContext,useEffect,useState } from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { goods} from "../Goods";
import ListingCard from "../ListingCard";
import { AuthContext } from "../providers/AuthContext";

export default function ProfileLists(){
  const [products, setProducts] = useState([]);
  const {userAuth, setUserAuth} = useContext(AuthContext)
  useEffect(() => {

    fetch('http://localhost:7000/api/products') 
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
            setProducts(data);
        }
      })
      .catch((err) => console.error("Ошибка загрузки товаров:", err));
  }, []);





    return(
        <>
         <div className="grid">
            {products.filter(item => item.userId === userAuth.id).map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </>
    )
}
