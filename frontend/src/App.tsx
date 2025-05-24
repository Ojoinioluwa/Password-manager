import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

import Register from "./components/auth/Register";
import LoginForm from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import AddPassword from "./components/vault/AddPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/AddPassword" element={<AddPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
