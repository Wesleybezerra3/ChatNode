import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import useServerCheck from "../../hooks/useServerCheck";

import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

import socket from "../../services/socket";
import api from "../../services/api";


const Home = () => {
  useServerCheck();

  const { user, logUser } = useContext(UserContext);
  const [messageObj, setMessageObj] = useState({
    message: "",
    author: null,
  });
  const [messages, setMessages] = useState([]);

  const handleObj = (e) => {
    const { name, value } = e.target;
    setMessageObj({ ...messageObj, [name]: value });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (user) {
      setMessageObj((prev) => ({
        ...prev,
        author: user.username,
      }));
    }
    if (messageObj.message) {
      socket.emit("sendMessage", messageObj);
      sendMessage({ ...messageObj, message: "" });
    }
    setMessageObj({
      message: "",
    });
  };

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
        }
      } catch (err) {
        console.log(
          "Erro ao realizar autenticação ou usuário não logado.",
          err
        );
      }
    };
    //Ouvindo mensagens antigas quando o usuário entra
    socket.on("prevMessages", (messagesData) => {
      setMessages(messagesData);
    });

    //Ouvindo mensagens novas em tempo real
    socket.on("receivedMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    getUser();

    //Remove os eventos quando o componente for desmontado
    return () => {
      socket.off("prevMessages");
      socket.off("receivedMessage");
    };
  }, []);

  return (
    <div className="container">
      <form id="chat" onSubmit={sendMessage}>
        <div class="messages">
          {messages.map((msg, i) => (
            <p key={i}>
              <strong>{msg.author}: </strong>
              {msg.message}
            </p>
          ))}
          <div className="container-input">
            <input
              type="text"
              name="message"
              placeholder="Digite sua mensagem"
              value={messageObj.message}
              onChange={handleObj}
              className="input-chat"
            />

            <button className="btn-chat" type="submit">
              <FontAwesomeIcon icon={faCaretRight} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Home;
