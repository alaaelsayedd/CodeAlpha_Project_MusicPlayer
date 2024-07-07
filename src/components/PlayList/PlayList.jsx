import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setmusicplay } from "../../Redux/musicplaylistSlice";
import { setCount } from "../../Redux/counterSlice";

function PlayList() {
  const [playlists, setPlayLists] = useState([]);
  const [isplaying, setPlayingState] = useState(false);
  const [itemindex, setItemindex] = useState(null);
  const [playListIndex, setIndex] = useState(0);
  const [startIndex,setStartIndex] =useState(0);
  const dispatch = useDispatch();
  const { isEnd } = useSelector((state) => state.end);

  const { playListsChange } = useSelector((state) => state.playLists);
  useEffect(() => {
    if (localStorage.getItem("PlayLists")) {
      setPlayLists(JSON.parse(localStorage.getItem("PlayLists")));
    }
  }, [playListsChange]);
  const [showDetails, setShowDetails] = useState(false);
  function handleShowDetails() {
    setShowDetails(!showDetails);
  }
  function handleDelete(id) {
    const playlistUpdate = [...playlists];
    playlistUpdate.splice(id, 1);
    setPlayLists(playlistUpdate);
    localStorage.setItem("PlayLists", JSON.stringify(playlistUpdate));
  }
  function handleDeleteItem(itemindex, indexOfPlayList) {
    const playlistUpdate = [...playlists];
    playlistUpdate[indexOfPlayList].playListSongs.splice(itemindex, 1);
    setPlayLists(playlistUpdate);
    localStorage.setItem("PlayLists", JSON.stringify(playlistUpdate));
  }
  function handleplayingState(index) {
    setPlayingState(!isplaying);
    setIndex(index);
  }
  function handlePlaying(index) {
    if (isplaying == true) {
      dispatch(setmusicplay(playlists[index].playListSongs[startIndex]));
    } else {
    }
  }
  function displayMusic(musicindex, playListIndex) {
    dispatch(setmusicplay(playlists[playListIndex].playListSongs[musicindex]));
    setStartIndex(musicindex);
  }
  useEffect(() => {
    handlePlaying(playListIndex);
    if(isEnd && isplaying)
    {
      dispatch(setmusicplay(playlists[playListIndex].playListSongs[startIndex+1]));
      setStartIndex(startIndex+1);

    }
  }, [isplaying,isEnd]);

  return (
    <>
      <div className="p-5 text-neutral-300">
        <h2 className=" text-3xl text-center  border-b p-2  rounded-md">
          Your PlayList
        </h2>
      </div>
      {/* <div className="flex gap-2 text-red-800 border border-red-800 w-full p-3 rounded-md  text-lg justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <p>Create A PlayList</p>
      </div> */}
      <div className="p-2 text-neutral-300">
        {playlists?.length > 0 ? (
          playlists.map((playlist, index) => {
            return (
              <div>
                <div
                  className="bg-neutral-900 p-3 rounded-md my-2 flex justify-between cursor-pointer"
                  key={index}
                >
                  <div
                    className="flex gap-x-2 items-center"
                    onClick={() => {
                      setItemindex(index);
                      handleplayingState(index);
                    }}
                  >
                    {isplaying && itemindex == index ? (
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
                        className="size-6 text-red-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                        />
                      </svg>
                    )}

                    <p className="text-lg">{playlist.playListName}</p>
                  </div>
                  <div className="text-red-700 flex gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 "
                      onClick={handleShowDetails}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer "
                      onClick={() => handleDelete(index)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  {playlist.playListSongs.map((playListSong, key) => {
                    return (
                      <div
                        className="flex justify-between"
                        onClick={() => displayMusic(key, index)}
                      >
                        <div className="p-2 flex gap-x-2">
                          <p>{playListSong.Music_name}</p>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 cursor-pointer"
                          onClick={() => handleDeleteItem(key, index)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <>
            <p className="text-xl">You have not Play List Yet</p>
          </>
        )}
      </div>
    </>
  );
}

export default PlayList;
