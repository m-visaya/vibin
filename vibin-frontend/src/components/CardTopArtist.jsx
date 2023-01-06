import spotifyLogo from "../assets/spotify/Spotify_Logo_RGB_Green.png";

function CardTopArtist({ name, followers, cover, href }) {
  return (
    <div className="flex flex-col gap-4 relative">
      <img
        src={cover}
        alt=""
        className="w-28 md:w-40 aspect-square object-cover rounded-2xl"
      />
      <div className="text-gray-300">
        <h2 className="text-2xl line-clamp-2">{name}</h2>
        <p className="text-primary-dark">
          {formatFollowers(followers)} followers
        </p>
      </div>
      <a
        href={href}
        target="_blank"
        className=" w-max bottom-0 right-0 cursor-pointer"
      >
        <img src={spotifyLogo} alt="" className="h-6 w-auto" />
      </a>
    </div>
  );
}

function formatFollowers(val) {
  if (val > 999999) {
    return `${Math.floor(val / 1000000)}M`;
  } else if (val > 999) {
    return `${Math.floor(val / 1000)}K`;
  }
  return val;
}

export default CardTopArtist;
