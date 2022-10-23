import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const AdminAddSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songName, setSongName] = useState({
    title: "",
    artist: "",
    album: "",
    duration: "",
    year: "",
    file: "",
  });

  console.log(songName.file);

  const fileTypes = ["mp3"];

  const handleChange = (file) => {
    setSongName({ ...songName, file: file });
  };

  const onAdd = async () => {
    try {
      const formData = new FormData();
      Object.keys(songName).forEach((key) => {
        formData.append(key, songName[key]);
      });
      const url = "http://localhost:3000/api/admin/add-song";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        console.log(response.data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-900 h-screen">
      <div className="flex items-center p-2 gap-5">
        <i
          className="ri-arrow-left-circle-line cursor-pointer text-white text-3xl"
          onClick={() => navigate("/admin")}
        ></i>
        <h1 className="text-3xl text-white text-center"></h1>
      </div>
      <div className="flex flex-col items-center gap-5">
        <input
          type="text"
          placeholder="Song Name"
          className="w-1/2 p-2 rounded-xl"
          value={songName.title}
          onChange={(e) => setSongName({ ...songName, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Artist"
          className="w-1/2 p-2 rounded-xl"
          value={songName.artist}
          onChange={(e) => setSongName({ ...songName, artist: e.target.value })}
        />
        <input
          type="text"
          placeholder="Album"
          className="w-1/2 p-2 rounded-xl"
          value={songName.album}
          onChange={(e) => setSongName({ ...songName, album: e.target.value })}
        />
        <input
          type="text"
          placeholder="Duration"
          className="w-1/2 p-2 rounded-xl"
          value={songName.duration}
          onChange={(e) =>
            setSongName({ ...songName, duration: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Year"
          className="w-1/2 p-2 rounded-xl"
          value={songName.year}
          onChange={(e) => setSongName({ ...songName, year: e.target.value })}
        />
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        {songName && (
          <h1 className="text-white text-lg">{songName.file.name}</h1>
        )}
        <button
          onClick={onAdd}
          className="bg-green-700 text-white p-2 rounded-xl"
        >
          Add Song
        </button>
      </div>
    </div>
  );
};

export default AdminAddSong;
