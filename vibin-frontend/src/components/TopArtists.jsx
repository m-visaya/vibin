import { motion, useAnimation } from "framer-motion";

import iconMic from "../assets/top-artists-mic.svg";
import CardTopArtist from "./CardTopArtist";

function TopArtists({ data }) {
  const controls = useAnimation();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.4 }}
        className="section"
      >
        <div className="relative text-center flex flex-col -mt-36">
          <img src={iconMic} className="h-36 -mb-4"></img>
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">ARTISTS</h1>
        </div>
      </motion.div>
      <motion.div
        viewport={{ amount: 0.4 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        className="section grid md:grid-cols-2 md:gap-20 max-w-5xl gap-7 px-10"
      >
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
      </motion.div>
    </>
  );
}

export default TopArtists;
