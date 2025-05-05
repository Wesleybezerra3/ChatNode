import React, { useState, useContext } from "react";
import "./style.css";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";
import { faL } from "@fortawesome/free-solid-svg-icons";
import api from "../../services/api";
import { UserContext } from "../../context/Contexts";

const CreateChat = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [textNotification, setTextNotification] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const [createData, setCreateData] = useState({
    name: "",
    password: null,
    is_private: null,
    created_by: "",
  });
  const [createBy, setCreateBy] = useState("");
  const [marked, setMarked] = useState(false);

  const handleObj = (e) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  const verfyField = () => {
    if (marked) {
      if (!createData.name || !createData.password) {
        setTextNotification(
          "Por favor, preencha todos os campos antes de continuar. ✍️"
        );
        setResetKey((prev) => prev + 1);
        return false;
      }
    }

    if (!createData.name) {
      setTextNotification("Por favor, defina um nome antes de continuar. ✍️");
      setResetKey((prev) => prev + 1);
      return false;
    }
    return true;
  };
  // const getCreateByAndIsPrivate = (user) => {
  //   if (user && user.id) {
  //     const newData = {
  //       ...createData,
  //       created_by: user.id,
  //       is_private: marked,
  //     };
  //     return newData;
  //   }
  //   setTextNotification("Erro ao obter dados, tente novamente.");
  //   setResetKey((prev) => prev + 1);
  //   return;
  // };

  const postChat = async (data) => {
    try {
      const response = await api.post('/chats/create_chat',data,{
        headers: { "Content-Type": "application/json" }
      });
      console.log('Chat created:', response.data);
      const message = response.data.message;
      setTextNotification(message);
      setResetKey((prev) => prev + 1);

    } catch (err) {
      const message = err.response?.data?.message || "Erro ao criar o chat, tente novamente.";
      setTextNotification(message);
      setResetKey((prev) => prev + 1);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (verfyField()) {
      const newData = {
        ...createData,
        created_by: user.id,
        is_private: marked,
      };
      await postChat(newData).then(()=>{
        setTimeout(() => {
          navigate("/meus_chats");
        }, 3000);
      })
    }
  };

  return (
    <>
      <Notification text={textNotification} resetKey={resetKey} />
      <main className="main-create-chat">
        {/* <section className="container-create-chat"> */}

        <div className="container-text-action">
          <p>Junta a galera</p>
          <p>
            <span>cria teu chat</span>
          </p>
          <p>e manda ver no papo</p>
        </div>
        <form onSubmit={handleForm} className="form-create-chat">
          <input
            type="text"
            placeholder="Nome do chat"
            name="name"
            id="input-name"
            value={createData.name}
            onChange={handleObj}
          />
          <div className="container-input-visible">
            <p>{marked ? "Privado" : "Público"}</p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  setMarked((prev) => !prev);
                }}
              />
              <span className="slider"></span>
            </label>
            <input
              className={marked ? "visible" : ""}
              type="password"
              name="password"
              placeholder="Crie uma senha"
              value={createData.password}
              onChange={handleObj}
            />
          </div>
          <div className="container-btns-create">
            <button
              onClick={() => {
                navigate("/");
              }}
            >
              Cancelar
            </button>
            <button type="submit">Criar chat</button>
          </div>
        </form>
        <div className="container-logo-create">
          <img src={logo} alt="logo" />
        </div>
        {/* </section> */}
      </main>
    </>
  );
};

export default CreateChat;
