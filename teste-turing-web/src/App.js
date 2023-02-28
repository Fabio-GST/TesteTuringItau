import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  
  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", newUser);
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  const HomeRoute = () => {
    return user ? (
      <Home user={user} logout={logout} setUser={setUser}/>
    ) : (
      <Navigate to="/Login" replace />
    );
  };

  const LoginRoute = () => {
    localStorage.removeItem("user");
    setUser(null);
    return <Login updateUser={updateUser} />;
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeRoute />} path="/" exact />
        <Route element={<LoginRoute />} path="/Login" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;