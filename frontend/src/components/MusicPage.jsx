import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SetAllSongs } from "../features/userSlice";
import PlayList from "./PlayList";
import SongList from "./SongList";
import Player from "./Player";

const MusicPage = () => {
  const allSongs = useSelector((state) => state.user);

  return (
    <div className="relative h-[calc(100vh-6rem)]">
      <div className="flex items-start mt-5 gap-5">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Album, Artist, or Song"
            className="w-full mb-2 border-2 border-gray-300 rounded-md p-2"
          />
          <PlayList list={allSongs.allSongs} />
        </div>
        <div className="w-1/2">
          <SongList />
        </div>
      </div>
      <Player />
    </div>
  );
};

export default MusicPage;
