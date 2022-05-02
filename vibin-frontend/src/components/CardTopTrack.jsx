import { motion } from "framer-motion";

import spotifyLogo from "../assets/spotify/Spotify_Logo_RGB_Green.png";

function CardTopTrack({ title, artists, cover, href }) {
  return (
    <div
      className="group flex flex-col bg-cover bg-center rounded-md relative w-full h-full"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <motion.div
        transition={{ duration: 0.25 }}
        whileHover={{ opacity: 1 }}
        className="absolute hidden group-hover:flex flex-col rounded-md justify-center items-center h-full w-full z-20 bg-neutral-800 opacity-0"
      >
        <div className="relative flex flex-col items-center">
          <p className="leading-tight text-gray-300 text-sm w-max text-center ml-2">
            listen on
          </p>
          <a href={href} target="_blank">
            <img src={spotifyLogo} alt="" className="h-10 cursor-pointer" />
          </a>
        </div>
      </motion.div>
      <div className="absolute h-full w-full rounded-md bg-gradient-to-t from-neutral-900 bottom-0 left-0"></div>
      <div className="mt-auto mb-4 mx-3 z-10">
        <h2 className="text-gray-100 text-2xl md:text-3xl line-clamp-2 pb-1 leading-tight ">
          {title}
        </h2>
        <h4 className="text-gray-300 line-clamp-1">
          {artists.reduce(
            (all_artists, artist, index) =>
              index + 1 < artists.length
                ? `${all_artists}${artist.name}, `
                : `${all_artists}${artist.name}`,
            ""
          )}
        </h4>
      </div>
    </div>
  );
}

export default CardTopTrack;
