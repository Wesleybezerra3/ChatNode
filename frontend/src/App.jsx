import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRoute";
import HomeNew from "./pages/HomeNew";
import Mychats from "./pages/Mychats";
import Connctions from "./pages/ConnectionsPeoples";
import Chats from "./pages/Chats";
import ChatLayout from "./pages/ChatLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path="/" element={<HomeNew />}>
            <Route index element={<Navigate to='/chats'/>} />
              <Route path="chats" element={<Chats />} />
              <Route path="meuschats" element={<Mychats />} />
              <Route path="conexões" element={<Connctions />} />
            </Route>
            <Route path="/chat/:name" element={<ChatLayout />} />
          </Route>
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
