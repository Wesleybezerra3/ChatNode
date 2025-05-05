import React, { useEffect, useState, useContext, useRef } from "react";
import "./style.css";

import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import socket from "../../services/socket";
import api from "../../services/api";
import formatDate from "../../utils/formatCreateAt";
import { Link } from "react-router-dom";

const ChatLayout = () => {
  const navigate = useNavigate();
  const chatName = useParams();

  const bottomRef = useRef(null);
  const { user } = useContext(UserContext);

  // const [usersOn, setUsersOn] = useState([]);

  const [chatId, setChatId] = useState(null);
  const [messageObj, setMessageObj] = useState({});
  const [messages, setMessages] = useState([]);

  //Função que pega o valor do input e atualiza o estado messageObj
  const handleObj = (e) => {
    const { name, value } = e.target;
    setMessageObj({ ...messageObj, [name]: value });
  };

  const exitChat = () => {
    navigate("/chats");
  };

  //Função que envia a mensagem para o servidor
  //A mensagem é enviada para o servidor e depois o servidor emite a mensagem para todos os usuários na sala
  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageObj.message || !user) return;
    const fullMessage = {
      ...messageObj,
      id: user.id,
      author: user.username,
    };
    socket.emit("sendMessage", fullMessage);

    setMessageObj({
      message: "",
    });
  };
  //Função que pega o id do chat no banco de dados
  useEffect(() => {
    const getIdChat = async () => {
      try {
        const name = chatName.name;
        const response = await api.get("/chats/get_id", {
          params: { name },
        });
        return response.data.id;
      } catch (err) {
        console.log("Eror na requisição do id", err);
      }
    };
    getIdChat().then((id) => {
      setChatId(id);
    });
  }, []);

  //Função que espera o chatId ser definido antes de entrar na sala
  //Isso é necessário porque o socket.on("prevMessages") e socket.on(uptadeUsersOn) só pode ser chamado depois que o chatId for definido

  //Função que faz o scroll para o final da tela quando uma nova mensagem é recebida
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //Função que entra na sala e ouve as mensagens
  //Quando o usuário entra na sala, ele emite o evento "joinRoom" para o servidor e o servidor emite o evento "prevMessages" com as mensagens antigas
  useEffect(() => {
      if (chatId && user?.username) {
        //Entrando na sala com o id do chat e o username do usuário
        socket.emit("joinRoom", chatId);
        //Emitindo o evento "usersOn" para o servidor com o username do usuário

        // socket.emit("usersOn", user.username);

        //Ouvindo o evento "updateUsersOn" que é emitido pelo servidor quando um usuário entra ou sai da sala
        // socket.on("updateUsersOn", (newUsersOn) => {
        //   setUsersOn(newUsersOn);
        //   console.log(newUsersOn);
        // });

        //Ouvindo mensagens antigas quando o usuário entra
        socket.on("prevMessages", (messagesData) => {
          setMessages(messagesData);
        });
      }
      //Ouvindo mensagens novas em tempo real
      socket.on("receivedMessage", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
 
   

    //Remove os eventos quando o componente for desmontado
    return () => {
      socket.off("prevMessages");
      socket.off("receivedMessage");
      socket.off("updateUsersOn");
    };
  }, [chatId, user]);

  return (
    <>
      <div className="container-header-chat">
        <button onClick={exitChat} className="exit-chat">
          <Link to={"/chats"}>
            {" "}
            <FontAwesomeIcon icon={faCaretLeft} /> Sair do chat
          </Link>
        </button>

        <div className="container-name-chat">
          <p>{chatName.name}</p>
        </div>
        {/* <div className="container-usersOn">
          <h3>Usuários Online</h3>
          <div className="usersOnP">
            {usersOn.map((userOn, i) => (
              <p key={i}>{userOn}</p>
            ))}
          </div>
        </div> */}
      </div>

      <div className="container">
        <form id="chat" onSubmit={sendMessage}>
          <div class="messages-container">
            {messages.map((msg, i) => (
              <div className="message" key={i}>
                <div className="header-message">
                  <p>{msg.author}</p>
                  <span>{formatDate(msg.created_at)}</span>
                </div>
                <div class="container-message">
                  <p>{msg.message}</p>
                </div>
              </div>
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
    </>
  );
};

export default ChatLayout;
