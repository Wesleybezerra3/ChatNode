import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import "../css/formStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "../../components/Notification";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import { UserContext} from "../../context/Contexts";


const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [textNotification, setTextNotification] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const saveToken = (token) => {
    const expiration = Date.now() + 60 * 60 * 1000; // 1 hora (em ms)
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiration", expiration.toString());
  };

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
      saveToken(token);
      const message = response.data.message;
      setTextNotification(message);
      setResetKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      const message = err.response.data.message;
      setTextNotification(message);
      setResetKey((prev) => prev + 1);

    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (Object.values(loginData).some((field) => !field)) {
      setTextNotification(
        "Por favor, preencha todos os campos antes de continuar. ✍️"
      );
      setResetKey((prev) => prev + 1);
      return;
    }
    loginUser(loginData).then(() => {
      setTimeout(() => {
        navigate("/chats");
      }, 3000);
    });
  };

  return (
    <>
      <div className="container-center">
        <Notification text={textNotification} resetKey={resetKey} />
        <form className="login" onSubmit={handleForm}>
          <div className="container-logo-form">
            <img src={logo} alt="" />
          </div>
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
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
          </div>

          <button type="submit" className="btn">
            Entrar
          </button>
          <div className="container-link">
            <Link to={"/cadastro"}>Criar conta</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
