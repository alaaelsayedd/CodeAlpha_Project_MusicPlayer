import { useDispatch, useSelector } from "react-redux";
import { data } from "../../data";
import { setCount } from "../../Redux/counterSlice";
import { setSongs } from "../../Redux/SongsSlice";
import { useEffect } from "react";
import { setIndex, SetpropState } from "../../Redux/PropSlice";
import { setmusicplay } from "../../Redux/musicplaylistSlice";

function DispalySongs() {
  const { counter } = useSelector((state) => state.counter);
  const { songs } = useSelector((state) => state.songs);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSongs(data)); // Set initial songs data
  }, [dispatch]);
  function handleCurrentMusic(index) {
    dispatch(setCount(index));
    dispatch(setmusicplay(songs[index]));
  }
  function handleSearch(e) {
    if (e.target.value == "") {
      dispatch(setSongs(data));
      dispatch(setCount(0));
    } else {
      const filter = [];
      data.forEach((item) => {
        if (item.Music_name.includes(e.target.value)) {
          filter.push(item);
        }
      });
      if (filter.length > 0) {
        dispatch(setSongs(filter));
      } else {
        dispatch(setSongs(data));
      }
      dispatch(setCount(0));
    }
  }
  function handleSelection(e) {
    if (e.target.value == "all") {
      dispatch(setSongs(data));
      dispatch(setCount(0));
    } else {
      const filter = [];
      data.forEach((item) => {
        if (item.category.includes(e.target.value)) {
          filter.push(item);
        }
      });
      if (filter.length > 0) {
        dispatch(setSongs(filter));
      } else {
        dispatch(setSongs(data));
      }
      dispatch(setCount(0));
    }
  }
  function addToPlayList(index) {
    dispatch(SetpropState(true));
    dispatch(setIndex(index));
  }
  return (
    <>
      <div className="flex  my-2 ">
        <div className=" relative w-11/12 ">
          <input
            placeholder="Search For Songs"
            type="search "
            className="bg-neutral-800 text-neutral-400 px-2 focus:border-0 focus:outline-none  p-2 rounded-md inline-block w-11/12 me-1 "
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-700 absolute top-2 right-10  text-center"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <div>
          <select
            id="small"
            class="block  p-3 mb-6 text-sm bg-neutral-800 text-neutral-300 rounded-md border-0"
            onChange={handleSelection}
          >
            <option selected disabled>
              Category
            </option>
            <option value="all">All</option>
            <option value={"action"}>Action</option>
            <option value={"classic"}>Classic</option>
            <option value={"india"}>India</option>
            <option value={"romntic"}>Romantic</option>
            <option value={"arabic"}>Arabic</option>
            <option value={"english"}>English</option>
          </select>
        </div>
      </div>
      {songs &&
        songs?.map((song, key) => {
          return (
            <div
              className={`p-3 rounded-sm  my-2 flex justify-between gap-x-2 ${
                counter == key ? "bg-neutral-900" : "bg-neutral-950 "
              } hover:bg-neutral-800 cursor-pointer `}
              key={key}
              onClick={() => handleCurrentMusic(key)}
            >
              <div className="flex gap-3">
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
                <p className="text-neutral-400"> {song.Music_name}</p>
              </div>
              <div
                className="text-red-700 border border-red-700  rounded-md cursor-pointer"
                onClick={() => addToPlayList(key)}
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
          );
        })}
    </>
  );
}

export default DispalySongs;
