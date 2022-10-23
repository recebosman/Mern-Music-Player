import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return <div>{children}</div>;
};

export default PublicRoutes;
