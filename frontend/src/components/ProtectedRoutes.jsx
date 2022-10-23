import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetAllSongs, SetUser } from "../features/userSlice";

const ProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [userData, setUserData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const getUserData = async () => {
    try {
      const url = "http://localhost:3000/api/auth/get-data";
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        dispatch(SetUser(response.data));
      }
      setRender(true);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      navigate("/login");
      setRender(true);
    }
  };

  useEffect(() => {
    if (user === null) {
      getUserData();
    }
  }, []);

  const getAllSongs = async () => {
    const link = "http://localhost:3000/api/songs/get-songs";
    const response = await axios.post(
      link,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data) {
      dispatch(SetAllSongs(response.data));
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getAllSongs();
  }, []);

  return <div>{render ? children : null}</div>;
};

export default ProtectedRoutes;
