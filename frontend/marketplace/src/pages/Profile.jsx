import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../components/Contexts";
import { AuthContext } from "../components/AuthContext";



export default function Profile() {

  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className={`site-${theme}`}>
      <Header />

      <main>
        <div className="search-bar">
          <SearchBar />
          <div className="search-actions">
            <button className={`btn-${theme}`}>Поиск</button>
            <button className={`btn-${theme}`}>Разместить объявление</button>
          </div>
        </div>
        </main>
        </div>
    )}