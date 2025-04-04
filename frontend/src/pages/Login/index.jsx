import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "../../components/notification";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [textNotification, setTextNotification] = useState('')
  const [resetKey, setResetKey] = useState(0);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleObj = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginUser = async (data) => {
    try {
      const response = await api.post("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });
     const token = response.data.token;
     localStorage.setItem('token',token)
      const message = response.data.message;
       setTextNotification(message)
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
      if (Object.values(loginData).some((field)=>!field)) {
        setTextNotification( 
          "Por favor, preencha todos os campos antes de continuar. ✍️"
        );
        setResetKey((prev) => prev + 1);
        return;
      }
      loginUser(loginData).then(() => {
        setLoginData({
          username: "",
          password: "",
        });
        navigate('/')
      });
    
  }

  return (
    <>
      <div className="container-center">
        <Notification text={textNotification} resetKey={resetKey}/>
        <form className="login" onSubmit={handleForm}>
          <h1>ChatNode</h1>
          <input
            type="text"
            className="input-form"
            placeholder="Apelido"
            onChange={handleObj}
            value={loginData.username}
            name="username"
          />
          <div>
            <input
              type={showPassword ? "text" : "password"}
              className="input-form"
              placeholder="Senha"
              onChange={handleObj}
              value={loginData.password}
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

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
