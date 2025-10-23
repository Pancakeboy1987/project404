import React from "react";
import '../ListingCard.css'
import { useContext } from "react";
import { ThemeContext } from "../Contexts";
import { goods} from "../Goods";
import ListingCard from "../ListingCard";
import './ProfileButtons.css'

export default function ProfileButtons(){
    const{theme,setTheme} = useContext(ThemeContext)

    return(

        <div className="buttons-list">
            <button className={`btn-${theme}`}>Мои объявления</button>
            <button className={`btn-${theme}`}>Избранное</button>
            <button className={`btn-${theme}`}>Завершенное</button> 

        </div>
    )
}