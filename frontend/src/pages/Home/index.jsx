import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faComments,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import useAutoLogout from "../../hooks/useAutoLogout";
import logo from "../../assets/logo.svg";
import hacker from "../../assets/Hacker-bro.png";
import PhotoProfile from "../../components/photoProfile";
import SideMenu from "../../components/SideMenu";

const Home = () => {
  useAutoLogout();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
 
  return (
    <>
      <SideMenu visible={isMenuVisible} />
      <header className="header-home">
        <div onClick={()=>setIsMenuVisible(prev => !prev)}>
        <PhotoProfile />
        </div>
        <div className="container-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="container-search">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </header>
      <section className="heroSection">
        <div className="heroSection-content">
          <h1>Bem-vindo ao ChatPrompt</h1>
          <p>Conecte-se com amigos e compartilhe momentos especiais.</p>
        </div>
        <div className="heroSection-image">
          <img src={hacker} alt="Logo" />
        </div>
      </section>

      <main>
        <Outlet />
      </main>

      <div className="spaceDiv">
      </div>

      <div className="navBar">
        <div>
          <Link to={"/meus_chats"}>
            <FontAwesomeIcon icon={faComment} />
          </Link>
        </div>
        <div>
          <Link to={"/chats"}>
            <FontAwesomeIcon icon={faComments} />
          </Link>
        </div>
        <div>
          <Link to={"/chats"}>
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
