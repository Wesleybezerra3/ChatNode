import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import '../css/formStyle.css'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Notification from "../../components/Notification";

import api from "../../services/api";

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const [notification, setNotification] = useState({
    text: "",
  });
  const [resetKey, setResetKey] = useState(0);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleObj = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const postUser = async (data) => {
    try {
      const dataFormat = { username: data.username, password: data.password };
      const response = await api.post("auth/register", dataFormat, {
        headers: { "Content-Type": "application/json" },
      });
      const message = response.data.message;
      setNotification({
        text: message,
      });
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();

      if (Object.values(registerData).some((field)=>!field)) {
        setNotification({
          text: "Por favor, preencha todos os campos antes de continuar. ✍️",
        });
        setResetKey((prev) => prev + 1);
        return;
      }

      if (registerData.password !== registerData.confirmPassword) {
        setNotification({
          text: "As senhas digitadas não coincidem. Verifique e tente novamente! ⚠️",
        });
        setResetKey((prev) => prev + 1);
        return;
      }
      
      postUser(registerData).then(() => {
        setRegisterData({
          username: "",
          password: "",
          confirmPassword: "",
        });
        navigate('/login')
      });
    
  };
  return (
    <>
      <div className="container-center">
        <Notification text={notification.text} resetKey={resetKey} />
        <form className="register" onSubmit={handleForm}>
          <h1>ChatNode</h1>
          <input
            type="text"
            className="input-form"
            placeholder="Apelido"
            onChange={handleObj}
            value={registerData.username}
            name="username"
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              className="input-form"
              placeholder="Senha"
              ref={passwordRef}
              onChange={handleObj}
              value={registerData.password}
              name="password"
            />
            <div
              className="eye"
              onMouseDown={() => {
                setShowPassword(!showPassword);
              }}
              onMouseUp={() => {
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>
          <input
            type="password"
            className="input-form"
            placeholder="Confimar senha"
            onChange={handleObj}
            value={registerData.confirmPassword}
            name="confirmPassword"
          />

          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
