import iconMic from "../assets/top-artists-mic.svg";
import CardTopArtist from "./CardTopArtist";

function TopArtists({ data }) {
  return (
    <>
      <div className="section">
        <div className="relative text-center flex flex-col -mt-36">
          <img src={iconMic} className="h-36 -mb-4"></img>
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">ARTISTS</h1>
        </div>
      </div>
      <div className="section grid md:grid-cols-2 md:gap-20 max-w-5xl gap-7 px-10">
        {data &&
          data.items.map((item, index) => {
            return (
              <CardTopArtist
                name={item.name}
                followers={item.followers.total}
                cover={item.images[0].url}
                key={"top-artist-" + index}
              />
            );
          })}
      </div>
    </>
  );
}

export default TopArtists;
