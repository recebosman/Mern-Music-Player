import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { SetCurrentSong, SetCurrentSongIndex } from "../features/userSlice";
import { useEffect } from "react";

const Player = () => {
  const currentSong = useSelector((state) => state.user.currentSong);
  const currentSongIndex = useSelector((state) => state.user.currentSongIndex);
  const allSongs = useSelector((state) => state.user.allSongs);

  const dispatch = useDispatch();

  const onPrev = () => {
    if (currentSongIndex > 0) {
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
    } else if (currentSongIndex === 0) {
      dispatch(SetCurrentSong(allSongs[allSongs.length - 1]));
      dispatch(SetCurrentSongIndex(allSongs.length - 1));
    }
  };

  const onNext = () => {
    if (currentSongIndex < allSongs.length - 1) {
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
    } else if (currentSongIndex === allSongs.length - 1) {
      dispatch(SetCurrentSong(allSongs[0]));
      dispatch(SetCurrentSongIndex(0));
    }
  };

  useEffect(() => {
    onPrev();
    onNext();
  }, []);

  return (
    <div className="bg-gray-200 absolute bottom-0 left-0 right-0 p-5 shadow-lg">
      <div className="flex justify-between items-center">
        {currentSong ? (
          <AudioPlayer
            style={{ borderRadius: "1rem" }}
            src={currentSong.src}
            onPlay={(e) => console.log("onPlay")}
            autoPlay
            header={currentSong.title}
            onClickPrevious={onPrev}
            showSkipControls={true}
            onClickNext={onNext}
          />
        ) : (
          <h1>Please chose some song to start</h1>
        )}
      </div>
    </div>
  );
};

export default Player;
