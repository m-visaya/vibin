import iconMic from "../assets/top-artists-mic.svg";
import CardTopArtist from "./CardTopArtist";

function TopArtists() {
  return (
    <>
      <div className="section">
        <div className="relative text-center flex flex-col -mt-36">
          <img src={iconMic} className="h-36 -mb-4"></img>
          <h1 className="text-gray-200">YOUR TOP</h1>
          <h1 className="text-green-500">ARTISTS</h1>
        </div>
      </div>
      <div className="section grid md:grid-cols-2 md:gap-20 max-w-5xl gap-7 px-10">
        <CardTopArtist></CardTopArtist>
        <CardTopArtist></CardTopArtist>
        <CardTopArtist></CardTopArtist>
        <CardTopArtist></CardTopArtist>
      </div>
    </>
  );
}

export default TopArtists;
