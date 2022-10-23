import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetCurrentSong, SetCurrentSongIndex } from "../features/userSlice";

const PlayList = ({ list }) => {
  const dispatch = useDispatch();

  const { currentSong, selectedPlaylist } = useSelector((state) => state.user);
  return (
    <div className="flex bg-white p-2 flex-col  justify-between items-center">
      {selectedPlaylist?.songs?.map((song, index) => {
        const isPlaying = currentSong?._id === song._id;
        return (
          <div
            key={song._id}
            className={`flex w-full justify-between border-b-2 mb-2 ${
              isPlaying ? "bg-gray-200 shadow border-2 rounded p-2 " : ""
            }`}
            onClick={() => {
              dispatch(SetCurrentSong(song)),
                dispatch(SetCurrentSongIndex(index));
            }}
          >
            <div>
              <h1>{song.title}</h1>
              <h1>
                {song.artist} {song.album} {song.year}{" "}
              </h1>
            </div>
            <div>
              <h1> {song.duration} </h1>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayList;
