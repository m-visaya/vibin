import { motion, useAnimation } from "framer-motion";

import iconMic from "../assets/top-artists-mic.svg";
import CardTopArtist from "./CardTopArtist";

function TopArtists({ data }) {
  const controls = useAnimation();
  const artists = data.items.slice(0, 4);

  return (
    <>
      <div className="section">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ amount: "all", once: true }}
          className="relative text-center flex flex-col -mt-36"
        >
          <motion.img
            whileInView={{ opacity: 1, y: [-100, 0] }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: "all", once: true }}
            src={iconMic}
            className="h-36 -mb-4"
          />
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">ARTISTS</h1>
        </motion.div>
      </div>
      <motion.div
        viewport={{ amount: 0.6, once: true }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        className="section grid md:grid-cols-2 md:gap-20 max-w-5xl gap-7 px-10"
      >
        {artists &&
          artists.map((item, index) => {
            return (
              <CardTopArtist
                name={item.name}
                followers={item.followers.total}
                cover={item.images[0].url}
                href={item.external_urls.spotify}
                key={"top-artist-" + index}
              />
            );
          })}
      </motion.div>
    </>
  );
}

export default TopArtists;
