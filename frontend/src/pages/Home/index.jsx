import React, { useEffect, useState } from "react";
import "./style.css";

import socket from "../../services/socket";
const Home = () => {
  const [messageObj, setMessageObj] = useState({
    author: "",
    message: "",
  });
  const [messages,setMessages]= useState([])
 

  const handleObj = (e) => {
    const { name, value } = e.target;
    setMessageObj({ ...messageObj, [name]: value });
  };

  const sendMessage = (e)=>{
    e.preventDefault();
    if(messageObj.author && messageObj.message){
        socket.emit("sendMessage", messageObj);
        sendMessage({...messageObj, message:""});
    }
  }

  useEffect(() => {
    //Ouvindo mensagens antigas quando o usuário entra
    socket.on("prevMessages", (messagesData) => {
      setMessages(messagesData);
    });
  
    //Ouvindo mensagens novas em tempo real
    socket.on("receivedMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  
    //Remove os eventos quando o componente for desmontado
    return () => {
      socket.off("prevMessages");
      socket.off("receivedMessage");
    };
  }, []);
  return (
    <div className="container">
      <form id="chat" onSubmit={sendMessage}>
        <input
          type="text"
          name="author"
          placeholder="Digite seu usuário"
          value={messageObj.author}
          onChange={handleObj}
          className="input-chat"
        />
        <div class="messages">
            {messages.map((msg,i)=>(
                <p key={i}>
                    <strong>{msg.author}: </strong>
                    {msg.message}
                </p>
            ))}
        </div>
        <input
          type="text"
          name="message"
          placeholder="Digite sua mensagem"
          value={messageObj.message}
          onChange={handleObj}
          className="input-chat"
        />
        <button className='btn-chat' type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Home;
