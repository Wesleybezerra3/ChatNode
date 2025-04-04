import { createContext, useState } from "react";

export const UserContext = createContext();


export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id:'',
    username:''
  });

  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider value={{ user, logUser }}>
       {children}
    </UserContext.Provider>
  );
};