import React, { useEffect, useState } from "react";
import "./style.css";
import CardChats from "../../components/CardChats";
import api from "../../services/api";

const Chats = () => {
  const [chatsData, setChatsData] = useState();
  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await api.get("/chats");
        const data = response.data;
        setChatsData(data.chats);
      } catch (err) {
        console.error(err);
      }
    };
    getChats();
  }, []);

  return (
    <section className="container-participating">
      <h1>Chats</h1>
      <div className="container-cards">
        {chatsData && chatsData.map((chat, i) => (
          <CardChats
            chatName={chat.name}
            creator={chat.created_by}
            acess={chat.is_private}
            key={i}
          />
        ))}
      </div>
    </section>
  );
};

export default Chats;
