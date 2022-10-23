import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
} from "../features/userSlice";

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );

  const allPlaylist = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user.data.playList,
  ];

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlaylist[0]));
    }
  }, [allSongs, selectedPlaylist]);

  return (
    <div>
      <div className="flex justify-between  m-4 ">
        <h1 className="text-white font-bold">Your Playlist</h1>
        <h1
          className="underline font-bold text-white"
          onClick={() => navigate("/create-list")}
        >
          Create Playlist
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-3 p-3">
        {allPlaylist?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              key={index}
              className={`flex flex-col bg-white rounded-xl gap-3 p-4 border ${
                isSelected && "bg-green-600"
              } `}
              onClick={() => dispatch(SetSelectedPlaylist(playlist))}
            >
              <h1>{playlist?.name}</h1>
              <h1>{playlist?.songs?.length} Songs </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
