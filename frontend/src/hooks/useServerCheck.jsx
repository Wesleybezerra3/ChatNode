import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
api;

const useServerCheck = () => {
    const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      api
        .get("/config/ping")
        .catch((err) => {
          console.error(err)
            alert('Servidor fora do ar! Redirecionando para o login...');
            navigate('/login')
        });
    }, 2000);
    return () => clearInterval(interval);
  },[navigate]);
};
export default useServerCheck;
