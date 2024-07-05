import { useRef, useState, useEffect } from "react";
import { data } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { setCount } from "../../Redux/counterSlice";
import { setmusicplay } from "../../Redux/musicplaylistSlice";

function AudioPlayer() {
  const { songs } = useSelector((state) => state.songs);
  const { musicplay } = useSelector((state) => state.musicplay);
  const { counter } = useSelector((state) => state.counter);
  const [isPlaying, setPlayState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const formattedHours =
      hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const formattedMinutes = `${minutes.toString().padStart(2, "0")}`;
    const formattedSeconds = `${secs.toString().padStart(2, "0")}`;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }

  function handlePreviousAndNext(count) {
    let newCounter = count;
    if (count >= songs.length) {
      newCounter = 0;
    } else if (count < 0) {
      newCounter = songs.length - 1;
    }
    dispatch(setCount(newCounter));
    dispatch(setmusicplay(songs[newCounter]));
    setPlayState(false);
  }

  function handleVolume() {
    setVolume(audioRef.current.volume);
  }

  function handleChangeVolume(e) {
    const volumeValue = parseFloat(e.target.value);
    audioRef.current.volume = volumeValue;
    if (volumeValue === 0) {
      setMute(true);
    } else {
      setMute(false);
    }
    setVolume(volumeValue);
  }

  function handleSeek(e) {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  }

  function playingAudio() {
    audioRef.current.play();
    setPlayState(true);
  }

  function pauseAudio() {
    audioRef.current.pause();
    setPlayState(false);
  }

  function handlePlayState() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playingAudio();
    }
  }

  function handleUpdate() {
    setCurrentTime(audioRef.current.currentTime);
  }

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("volumechange", handleVolume);
    audio.addEventListener("timeupdate", handleUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.src = musicplay.src;
    audio.load();
    setPlayState(false);

    return () => {
      audio.removeEventListener("timeupdate", handleUpdate);
      audio.removeEventListener("volumechange", handleVolume);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [counter, dispatch, musicplay]);

  return (
    <div className="bg-neutral-950 rounded-lg mt-5 mx-auto py-10 px-3  border border-neutral-900 w-full flex items-center flex-col gap-y-11">
      <h2 className="text-center text-3xl text-neutral-400">
        {musicplay.Music_name.toUpperCase()}
      </h2>
      <div className="flex justify-center items-center w-full p-10">
        <div
          className="text-red-700 rotate-180 cursor-pointer"
          onClick={() => handlePreviousAndNext(counter - 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
            />
          </svg>
        </div>
        <div
          className="click rounded-full bg-neutral-600-700 h-28 w-28 text-red-600 flex justify-center mx-20 items-center cursor-pointer border-2 border-red-600"
          onClick={handlePlayState}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          )}
        </div>
        <div
          className="text-red-700 cursor-pointer"
          onClick={() => handlePreviousAndNext(counter + 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
            />
          </svg>
        </div>
      </div>
      <div className="w-full">
        <div className="flex">
          <input
            type="range"
            value={currentTime}
            min={0}
            max={duration}
            className="w-3/4 block mb-0"
            onChange={handleSeek}
          />
          <div className="flex ms-5 text-gray-400">
            {mute ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                />
              </svg>
            )}
            <input
              type="range"
              value={volume}
              min={0}
              max={1}
              step="0.01"
              onChange={handleChangeVolume}
              className="block mb-0 w-32"
            />
          </div>
        </div>
        <audio src={musicplay.src} ref={audioRef} />
        <div className="flex justify-between">
          <div className="w-3/4 flex justify-between text-neutral-500 mt-0">
            <p>{formatDuration(currentTime)}</p>
            <p>{formatDuration(duration)}</p>
          </div>
          <div className="volume"></div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
