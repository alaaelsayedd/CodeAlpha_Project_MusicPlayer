import { useSelector } from "react-redux";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import DispalySongs from "../DisplaySongs/DisplaySongs";
import PlayList from "../PlayList/PlayList";
import PropPlayList from "../propPlaylist/PropPlayList";

function Home() {
  const { isProp } = useSelector((state) => state.prop);
  
  return (
    <div className="grid grid-cols-7 h-lvh w-full gap-x-2 relative ">
      <div className="  p-4  h-full overflow-y-auto srolling col-span-2">
        <DispalySongs />
      </div>
      <div className=" h-full flex justify-center   col-span-3 w-full ">
        <AudioPlayer />
      </div>
      <div className="  p-4  h-full overflow-y-auto srolling col-span-2">
        <PlayList />
      </div>
      {isProp && <PropPlayList />}
    </div>
  );
}

export default Home;
