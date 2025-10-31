import React from "react";
import '../ListingCard.css'
import {Link} from "react-router-dom"
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { goods} from "../Goods";
import ListingCard from "../ListingCard";

export default function ProfileLists(){




    return(
        <>
         <div className="grid">
            {goods.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        </>
    )
}
