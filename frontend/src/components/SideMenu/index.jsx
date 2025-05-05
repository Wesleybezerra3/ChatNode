import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../../context/Contexts";
import logo from "../../assets/logo.svg";
import PhotoProfile from "../../components/photoProfile";

const SideMenu = ({ visible }) => {
  const { user } = useContext(UserContext);
  const [isViisible, setIsVisible] = useState(visible);
  useEffect(() => {
    setIsVisible((prev) => !prev);
  }, [visible]);
  return (
    <>
      <div
        className="background-side-menu"
        style={{ display: isViisible ? "block" : "none" }}
        onClick={() => setIsVisible((prev) => !prev)}
      ></div>
      <div
        className="side-menu"
        style={{ display: isViisible ? "block" : "none" }}
      >
        <div className="header-side-menu">
          <div className="photo-user-side-menu">
            <PhotoProfile />
          </div>
          <div className="container-info-user-side-menu">
            <div className="name-id-user-side-menu">
              <p>{user.username}</p>
              <p>#{user.id}</p>
            </div>
            <div className="description-user-side-menu">
              <p>Desenvolvedor Full Stack</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
