import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/auth/Register";
import LoginForm from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import AddPassword from "./components/vault/AddPassword";
import ListPasswords from "./components/vault/ListPasswords";
import EditPassword from "./components/vault/EditPassword";
import MainDashboard from "./components/MainDashBoard";
// import PasswordStrengthChecker from "./ui/PasswordStrength";
import EmailPwnedChecker from "./ui/emailPwnedChecker";
// import GeneratePassword from "./components/vault/GeneratePassword";
import Test from "./components/vault/TestPassword";
import ListAuthorizedUsers from "./components/vault/authorize/ListAuthorized";
import AuthorizeUser from "./components/vault/authorize/AuthorizeUser";
import AddGroup from "./components/groups/AddGroup";
import ListGroups from "./components/groups/ListGroups";
import AboutGroups from "./components/groups/AboutGroups";
import AuthorizeGroup from "./components/groups/AuthorizeGroup";
import AddMember from "./components/groups/AddMember";
import EditGroup from "./components/groups/EditGroup";
import EditAuthorizeUser from "./components/vault/authorize/EditAuthorizeUser";
import AuthorizedPasswords from "./components/vault/authorize/AuthorizedPasswords";
import LandingPage from "./components/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/VerifyEmail" element={<VerifyEmail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<MainDashboard />}>
            <Route path="EditPassword/:passwordId" element={<EditPassword />} />
            <Route index element={<ListPasswords />} />
            <Route path="vault" element={<ListPasswords />} />
            <Route path="test" element={<Test />} />
            <Route path="authorize/:passwordId" element={<AuthorizeUser />} />
            <Route path="authorized" element={<ListAuthorizedUsers />} />
            <Route path="AddPassword" element={<AddPassword />} />
            <Route path="addGroup" element={<AddGroup />} />
            <Route path="groups/:groupId" element={<AboutGroups />} />
            <Route path="groups" element={<ListGroups />}></Route>
            <Route
              path="authorizedPasswords"
              element={<AuthorizedPasswords />}
            ></Route>
            <Route
              path="AuthorizeGroup/:groupId"
              element={<AuthorizeGroup />}
            />
            <Route path="addMember/:groupId" element={<AddMember />} />
            <Route path="editGroup/:groupId" element={<EditGroup />} />
            <Route
              path="editAuthorized/:authorizedId"
              element={<EditAuthorizeUser />}
            />
          </Route>
        </Route>
        {/* <Route path="/strength" element={<PasswordStrengthChecker />} /> */}
        <Route path="/email" element={<EmailPwnedChecker />} />
        {/* <Route path="/gen" element={<GeneratePassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
