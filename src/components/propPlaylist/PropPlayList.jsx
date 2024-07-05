import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetpropState } from "../../Redux/PropSlice";
import { setPlayLists } from "../../Redux/playListslice";

function PropPlayList() {
  const [playLists, setPlayList] = useState([]);
  const { index } = useSelector((state) => state.prop);
  const { songs } = useSelector((state) => state.songs);
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    if (localStorage.getItem("PlayLists")) {
      setPlayList(JSON.parse(localStorage.getItem("PlayLists")));
    }
  }, []);
  function createNewPlayList() {
    const playlist = {
      playListName: inputRef.current.value,
      playListSongs: [],
    };
    const updatePlayLists = [...playLists];
    updatePlayLists.push(playlist);
    localStorage.setItem("PlayLists", JSON.stringify(updatePlayLists));
    setPlayList(updatePlayLists);
    inputRef.current.value = "";
  }
  function addToPlaylist(current) {
    const updatePlaylist = [...playLists];
    const playsongs = [...updatePlaylist[current].playListSongs];
    let state = playsongs.find(
      (elem) =>
        elem.Music_name == songs[index].Music_name &&
        elem.src == songs[index].src
    );
   if(state==undefined)
   {
    updatePlaylist[current].playListSongs = [
      ...updatePlaylist[current].playListSongs,
      songs[index],
    ];
    localStorage.setItem("PlayLists", JSON.stringify(updatePlaylist));
    setPlayList(updatePlaylist);
    

   }
   dispatch(SetpropState(false));
   dispatch(setPlayLists());
  
    
  }

  return (
    <>
      <div className="bg-black bg-opacity-15   top-0 left-0 right-0 bottom-0  absolute flex justify-center items-center ">
        <div className="bg-neutral-900  p-10 w-1/2 rounded-md">
          <div className="flex gap-2 py-3">
            <input
              type="text"
              className=" w-3/4 p-2 px-3 border-0 outline-none bg-neutral-800 text-neutral-300 rounded-md"
              placeholder="Create Anew PlayList To add"
              ref={inputRef}
            />
            <div
              className="text-red-700 border border-red-700  rounded-md cursor-pointer p-2"
              onClick={createNewPlayList}
            >
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
            </div>
          </div>
          <div className="border-t border-neutral-800 p-2  text-neutral-300">
            <h2 className="text-lg p-2 my-2  text-neutral-300">
              {" "}
              Select Play List to add
            </h2>
            {playLists.length > 0 ? (
              playLists.map((playlist, index) => {
                return (
                  <div
                    className="bg-neutral-800 rounded-md p-4 flex gap-x-5 items-center my-2"
                    key={index}
                  >
                    <div
                      className="text-red-700 border border-red-700  rounded-md cursor-pointer p-1"
                      onClick={() => addToPlaylist(index)}
                    >
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
                    </div>
                    <p>{playlist.playListName}</p>
                  </div>
                );
              })
            ) : (
              <>
                <p className="p-2 text-neutral-300 text-2xl">
                  You donnot have PlayList Yet{" "}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropPlayList;
