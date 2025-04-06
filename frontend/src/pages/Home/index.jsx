import React, { useEffect, useState, useContext, useRef } from "react";
import "./style.css";
import useServerCheck from "../../hooks/useServerCheck";

import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import socket from "../../services/socket";
import api from "../../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  useServerCheck();

  const bottomRef = useRef(null);
  const { user, logUser } = useContext(UserContext);
  const [messageObj, setMessageObj] = useState({
    message: "",
  });
  const [messages, setMessages] = useState([]);

  const handleObj = (e) => {
    const { name, value } = e.target;
    setMessageObj({ ...messageObj, [name]: value });
  };

  const exitChat = ()=>{
    const token = localStorage.getItem('token')
    if(token){
      localStorage.removeItem('token')
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageObj.message || !user) return;
    const fullMessage = {
      ...messageObj,
      author: user.username,
    };
    socket.emit("sendMessage", fullMessage);

    setMessageObj({
      message: "",
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div className="container-exit">
        <button onClick={exitChat} className="exit-chat">
          <Link to={"/login"}>
            {" "}
            <FontAwesomeIcon icon={faCaretLeft} /> Sair do chat
          </Link>
        </button>
      </div>
      <form id="chat" onSubmit={sendMessage}>
        <div class="messages-container">
          {messages.map((msg, i) => (
            <p key={i}>
              <strong>{msg.author}: </strong>
              {msg.message}
            </p>
          ))}
          <div ref={bottomRef} />
        </div>

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
      </form>
    </div>
  );
};

export default Home;
