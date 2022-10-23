import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { allSongs } = useSelector((state) => state.user);

  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 h-screen">
      <div className="pt-12">
        <h1 className="text-3xl text-white text-center  mb-4 ">All Songs</h1>
        <button className="bg-green-700 text-white mb-4 rounded-xl">
          <h1
            className="text-xl text-white text-center cursor-pointer p-3"
            onClick={() => navigate("/admin/add-song")}
          >
            Add Song
          </h1>
        </button>
        <table className="table-fixed w-full">
          <thead className="bg-gray-800 p-3 ">
            <tr className="text-white">
              <th className="w-1/4 px-4 py-2">title</th>
              <th className="w-1/4 px-4 py-2">artist</th>
              <th className="w-1/4 px-4 py-2">Album</th>
              <th className="w-1/4 px-4 py-2">Duration</th>
              <th className="w-1/4 px-4 py-2">Year</th>
              <th className="w-1/4 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {allSongs?.map((song, index) => {
              return (
                <tr key={index} className="text-white">
                  <td className="border px-4 py-2">{song.title}</td>
                  <td className="border px-4 py-2">{song.artist}</td>
                  <td className="border px-4 py-2">{song.album}</td>
                  <td className="border px-4 py-2">{song.duration}</td>
                  <td className="border px-4 py-2">{song.year}</td>
                  <td className="border px-4 py-2">
                    <i
                      className="ri-pencil-line text-2xl text-white"
                      onClick={() => setSelected(song)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
