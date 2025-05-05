import { createContext, useState } from "react";

export const UserContext = createContext();
export const LoadingContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);

  const handleLoading = (loadingState) => setLoading(loadingState);
  const logUser = (userData) => setUser(userData);
  return (
    <UserContext.Provider value={{ user, logUser }}>
      <LoadingContext.Provider value={{ loading, handleLoading }}>
        {children}
      </LoadingContext.Provider>
    </UserContext.Provider>
  );
};
