import React, { useState, useContext, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { UserContext } from "../../context/Contexts";
import MyChatsCard from "../../components/MyChatsCard";

const Mychats = () => {
  const { user } = useContext(UserContext);
  const [chatsData, setChatsData] = useState([]);
  useEffect(() => {
    const getMyChats = async () => {
      try {
        if (!user && !user.id) {
          console.log("Erro ao obter dados do usuário.");
          return;
        }
        const response = await api.get("/chats/my_chats", {
          params: {
            id: user.id,
          },
          headers: { "Content-Type": "application/json" },
        });
        console.log("Meus chats", response.data.chats);
        setChatsData(response.data.chats);
      } catch (err) {
        console.error("Erro ao buscar meus chats", err);
      }
    };
    getMyChats();
  }, [user]);
  return (
    <>
      <section className="container-mychats">
        <h1>Meus Chats</h1>
        <div className="container-button-new">
        <Link to={"/criar_chat"} className="btn-new-chat">
          Criar novo chat
          <div className="add-icon">
            <FontAwesomeIcon icon={faAdd} />
          </div>
        </Link>
      </div>
        <div className="container-cards-mychats">
          {chatsData &&
            chatsData.map((chat, i) => (
              <MyChatsCard
                chatName={chat.name}
                acess={chat.is_private}
                key={i}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default Mychats;
