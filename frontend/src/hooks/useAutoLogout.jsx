import React, { useEffect } from 'react'

const useAutoLogout= () => {
  useEffect(() => {
    const expiration = localStorage.getItem("token_expiration");
  
    if (expiration) {
      const now = Date.now();
      const timeLeft = parseInt(expiration) - now;
  
      if (timeLeft > 0) {
        const timeout = setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("token_expiration");
          console.log("Token expirado e removido automaticamente");
  
          // Aqui você pode redirecionar o usuário, resetar estado, etc
          window.location.reload(); // se quiser forçar um reload
  
        }, timeLeft);
  
        return () => clearTimeout(timeout); // limpa caso o componente desmonte
      } else {
        // Já expirou
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiration");
      }
    }
  }, []);
}

export default useAutoLogout