import React, { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faComment,
  faComments,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import PhotoProfile from "../../components/photoProfile";
import { UserContext } from "../../context/UserContext";

const HomeNew = () => {
  const { user, logUser } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = response.data;
          logUser(user);
          // socket.emit("usersOn", user.username);
        }
      } catch (err) {
        console.log(
          "Erro ao realizar autenticação ou usuário não logado.",
          err
        );
      }
    };
    getUser();
  },[]);
  return (
    <>
      <header className="header-home">
       <PhotoProfile/>
        <div className="container-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="container-search">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <div className="navBar">
        <div>
          <Link to={"/meuschats"}>
            <FontAwesomeIcon icon={faComment} />
          </Link>
        </div>
        <div>
          <Link to={"/chats"}>
            <FontAwesomeIcon icon={faComments} />
          </Link>
        </div>
        <div>
          <Link to={"/conexões"}>
            <FontAwesomeIcon icon={faUserGroup} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeNew;
