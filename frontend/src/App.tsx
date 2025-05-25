import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"

import Register from "./components/auth/Register";
import LoginForm from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import AddPassword from "./components/vault/AddPassword";
import ListPassowrds from "./components/vault/ListPassowrds";
import EditPassword from "./components/vault/EditPassword";
import MainDashboard from "./components/MainDashBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/AddPassword" element={<AddPassword />} />
        <Route path="/ListPassword" element={<ListPassowrds />} />
        <Route path="/EditPassword" element={<EditPassword />} />
        <Route path="/dashboard" element={<MainDashboard />} >
          <Route index element={<ListPassowrds/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
