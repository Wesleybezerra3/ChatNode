import React, { useState, useRef } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Notification from "../../components/notification";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef(null);
  const [textNotification, setTextNotification] = useState({
    text: "",
    color: "",
  });
  const [resetKey,setResetKey] = useState(0);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleObj = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (registerData) {
      if (registerData.password !== registerData.confirmPassword) {
        setTextNotification(
          {
            text:'Senhas diferentes ⚠️',
            color:'yellow',
          }
        );
        setResetKey((prev)=>prev++)
      }
    }
    console.log(registerData);
  };

  const handleViewPasswordDown = () => {
    if (passwordRef.current) {
      passwordRef.current.type = "text";
      setShowPassword(true);
    }
  };
  const handleViewPasswordUp = () => {
    if (passwordRef.current) {
      passwordRef.current.type = "password";
      setShowPassword(false);
    }
  };
  return (
    <>
      <div className="container-center">
        <Notification text={textNotification.text} color={textNotification.color} resetKey={resetKey}/>
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
              type="password"
              className="input-form"
              placeholder="Senha"
              ref={passwordRef}
              onChange={handleObj}
              value={registerData.password}
              name="password"
            />
            <div
              className="eye"
              onMouseDown={handleViewPasswordDown}
              onMouseUp={handleViewPasswordUp}
              onMouseLeave={handleViewPasswordUp}
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
