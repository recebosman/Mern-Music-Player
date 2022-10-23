import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import CreateSong from "./pages/CreateSong";
import Admin from "./pages/Admin";
import AdminAddSong from "./pages/AdminAddSong";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <LoginPage />{" "}
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <RegisterPage />{" "}
              </PublicRoutes>
            }
          />
          <Route
            path="/create-list"
            element={
              <ProtectedRoutes>
                <CreateSong />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <Admin />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/add-song"
            element={
              <ProtectedRoutes>
                <AdminAddSong />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
