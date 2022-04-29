import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import iconDisc from "../assets/top-tracks-disc.svg";
import iconExpand from "../assets/expand.svg";
import CardTopTrack from "./CardTopTrack";
import Navlink from "./Navlink";

function TopTracks({ data, timeRange, handleTimeRange, handleModal }) {
  const [onViewportOnce, setViewportOnce] = useState(false);
  const tracks = data[timeRange].items.slice(0, 5);
  const controls = useAnimation();

  const sequence = async (viewport) => {
    if (viewport) {
      if (onViewportOnce) {
        return;
      }
      setViewportOnce(true);
    }
    await controls.start((i) => ({
      opacity: 0,
      transition: { duration: 0 },
    }));
    return await controls.start((i) => ({
      opacity: [0, 1],
      x: [200, 0],
      transition: { delay: i * 0.1 },
    }));
  };

  useEffect(() => {
    sequence();
  }, [timeRange]);

  return (
    <>
      <div className="section">
        <motion.div
          viewport={{ amount: "all", once: true }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative text-center flex flex-col -mt-32"
        >
          <motion.img
            whileInView={{ opacity: 1, x: [-300, 0], rotate: [0, 360] }}
            transition={{ duration: 1 }}
            viewport={{ amount: "all", once: true }}
            src={iconDisc}
            className="h-36"
          />
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">TRACKS</h1>
        </motion.div>
      </div>
      <motion.div
        viewport={{ amount: "all", once: true }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => sequence(true)}
        className="section"
      >
        <div className="flex mb-10 -mt-10 gap-x-10 md:gap-x-20 text-gray-300">
          {[
            ["All Time", "long_term"],
            ["Past Months", "medium_term"],
            ["Most Recent", "short_term"],
          ].map((item) => (
            <Navlink
              rangeLabel={item[0]}
              timeRange={item[1]}
              selectedRange={timeRange}
              handleTimeRange={handleTimeRange}
            />
          ))}
        </div>
        <motion.div className="grid md:h-4/6 h-5/6 md:grid-rows-2 md:grid-cols-3 top-tracks lg:gap-6 gap-4 grid-cols-2 grid-rows-3 max-w-6xl relative px-5">
          {data &&
            tracks.map((item, index) => {
              return (
                <motion.div animate={controls} custom={index}>
                  <CardTopTrack
                    title={item.name}
                    artists={item.artists}
                    cover={item.album.images[0].url}
                    key={"top-track-" + index}
                  />
                </motion.div>
              );
            })}
          <p
            className="text-gray-300 absolute -bottom-12 right-0 px-5 cursor-pointer"
            onClick={handleModal}
          >
            view top 50
            <img src={iconExpand} alt="expand" className="inline w-5 mb-2" />
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}

export default TopTracks;
