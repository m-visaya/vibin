import spotifyIcon from "../assets/spotify/Spotify_Icon_RGB_Green.png";

function CardTop50Tracks({ title, artists, rank, cover, href }) {
  return (
    <div className="flex gap-4 relative">
      <img
        src={cover}
        alt=""
        className="w-28 aspect-square object-cover rounded-xl"
      />
      <div>
        <h2 className="text-2xl line-clamp-2 text-gray-100 leading-tight">
          {title}
        </h2>
        <p className="line-clamp-1 text-gray-300 font-light">
          {artists.reduce(
            (all_artists, artist, index) =>
              index + 1 < artists.length
                ? `${all_artists}${artist.name}, `
                : `${all_artists}${artist.name}`,
            ""
          )}
        </p>
        <a href={href} target="_blank">
          <img
            src={spotifyIcon}
            alt="spotifyIcon"
            className="h-5 mt-1 cursor-pointer"
          />
        </a>
      </div>
      <h3 className="absolute bottom-0 right-0 text-gray-300 text-4xl p-2 font-bold">
        {rank}
      </h3>
    </div>
  );
}

export default CardTop50Tracks;
