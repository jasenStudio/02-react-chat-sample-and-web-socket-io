import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";

const socket = io(`${import.meta.env.VITE_APP_URL}`);
const App = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const handleNewUserResponse = (data: any) => {
      console.log("Users updated:", data);
      setUsers(data); // Actualiza la lista de usuarios con los datos recibidos
    };

    // Escucha el evento de respuesta de nuevos usuarios
    socket.on("newUserResponse", handleNewUserResponse);

    // Limpia el listener al desmontar el componente
    return () => {
      socket.off("newUserResponse", handleNewUserResponse);
    };
  }, [socket, users]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home socket={socket} />}></Route>
        <Route
          path="/chat"
          element={<ChatPage socket={socket} users={users} />}
        ></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default App;
