import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard"
import ProfileLists from "../components/profileComponents/ProfileLists";
import ProfileButtons from "../components/profileComponents/ProfileButtons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/Contexts";
import { AuthContext } from "../components/AuthContext";
import voron from '../assets/voron.jpg'
import {goods} from "../components/Goods";
import '../components/profileComponents/profile.css'

//////Итак, мне нужно будет сделать оформление профиля как на ютубе и сделать возможность загружать свою фотку

export default function Profile() {

  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className={`site-${theme}`}>
      <Header />


        <div className="search-bar">
          <SearchBar />
          <div className="search-actions">
            <button className={`btn-${theme}`}>Поиск</button>
            <button className={`btn-${theme}`}>Разместить объявление</button>
          </div>
        </div>

        <div className={`profile-body-${theme}`}>
            <div className={`profile-main-block-${theme}`}>
            <img className="profile-picture" src={`${voron}`} alt="" />
            <div className="profile-text-block">
                <h3>Nickname</h3>
                <div className="profile-description"> 
                dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. 
                </div>
                <div className="star-block">
                    Here will be stars
                </div>
            </div>


            </div>

            <div className="profile-contacts-block">
                <div>Номер телефона: 88005553535</div>
                <div>Почта: зане41181собака</div>
                <div>соцсетей нет</div>
                
            </div>
        </div>

        <div className="profile-button-block">
            <ProfileButtons/>
        </div>

        <div className="profile-lists-block">
            <ProfileLists/>
        </div>
        

        </div>
    )}