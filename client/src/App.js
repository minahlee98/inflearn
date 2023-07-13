import React from "react";
import {
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth'


function App() {
  return (
    <BrowserRouter>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Routes>
          <Route exact path="/" Component={Auth(LandingPage, null)}/>
          <Route exact path="/login" Component={Auth(LoginPage, false)}/>          
          <Route exact path="/register" Component={Auth(RegisterPage, false)}/>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;