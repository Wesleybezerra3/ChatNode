import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import menuManage from "../../assets/menuManage.svg";

const MyChatsCard = ({chatName, acess}) => {
  return (
    <>
      <article className="container-mychats-card">
        <div className="mychats-card-info">
          <p>{chatName}</p>
          <p>{acess?'Chat privado':'Chat público'}</p>
        </div>
        <div className="container-mychats-card-btn">
          <div className="btn-joim-chat">
            <Link to={`/chat/${chatName}`}>Entrar no chat</Link>
          </div>

          <button className="btn-manage-chat">
            <img src={menuManage} alt="" />
          </button>
        </div>
      </article>
    </>
  );
};

export default MyChatsCard;
