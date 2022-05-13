import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import { playingTrackState } from "../atoms/playerAtom";
import { useRecoilState } from "recoil";
import Body from "./Body";
import Right from "./Right";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  function chooseTrack(track){
    setPlayingTrack(track);
  }

  return (
    <main className="flex w-[1600px] m-auto min-h-screen min-w-max bg-black lg:pb-24">
        <Sidebar />
        <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
        <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />

        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Player accessToken={accessToken} trackUri={playingTrack.uri}/>
        </div>
    </main>
  )
}

export default Dashboard