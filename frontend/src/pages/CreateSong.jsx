import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SetSelectedPlaylistForEdit, SetUser } from "../features/userSlice";
import { useEffect } from "react";

const CreateSong = () => {
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const { allSongs } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedUnselected = (song) => {
    if (selected.includes(song)) {
      setSelected(selected.filter((item) => item !== song));
    } else {
      setSelected([...selected, song]);
    }
  };

  const onSave = async () => {
    if (name.trim().length === 0 || selected.length === 0) {
      alert("Please enter name and select songs");
    } else {
      try {
        const url = "http://localhost:3000/api/songs/create-playlist";
        const response = await axios.post(
          url,
          {
            name,
            songs: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data) {
          setName("");
          setSelected([]);
          navigate("/home");
          dispatch(SetUser(response.data.data));
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (SetSelectedPlaylistForEdit) {
      setName(SetSelectedPlaylistForEdit.name);
      setSelected(SetSelectedPlaylistForEdit.songs);
    }
  }, []);

  return (
    <div className="flex flex-col gap-3 bg-gray-900 h-screen ">
      <Navbar />
      <h1 className="text-white font-bold  text-3xl mt-14 m-8">
        <Link to="/home">
          <i className="ri-door-open-fill text-gray-600 "></i>
        </Link>
        Create Song
      </h1>
      <div className="flex  items-center p-4 m-8 rounded-lg">
        <input
          type="text"
          placeholder="Enter Song Name"
          className="outline-none rounded-full p-2 w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-white rounded-full ml-auto p-2 " onClick={onSave}>
          Add Song
        </button>
      </div>
      <h2 className="text-bold text-2xl text-white m-8">
        Selected Song {selected?.length}
      </h2>
      <div className="flex rounded-lg">
        {allSongs.map((song, index) => {
          const isSelected = selected?.find((item) => item._id === song._id);

          return (
            <div
              key={song._id}
              className={`flex items-start flex-col bg-white m-6 w-[200px] h-[90px] p-2 cursor-pointer  rounded-lg ${
                isSelected && "shadow-lg bg-emerald-300 "
              }`}
              onClick={() => selectedUnselected(song)}
            >
              <h1>{song.artist}</h1>
              <h3>{song.title}</h3>
              <h4>{song.duration}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateSong;
