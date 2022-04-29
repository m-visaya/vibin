import { motion, useAnimation } from "framer-motion";

import iconDisc from "../assets/top-tracks-disc.svg";
import iconExpand from "../assets/expand.svg";
import CardTopTrack from "./CardTopTrack";
import Navlink from "./Navlink";
import { useEffect } from "react";

function TopTracks({ data, timeRange, handleTimeRange, handleModal }) {
  const tracks = data[timeRange].items.slice(0, 5);
  const controls = useAnimation();

  const sequence = async () => {
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ amount: 0.4 }}
        className="section"
      >
        <div className="relative text-center flex flex-col -mt-36">
          <img src={iconDisc} className="h-36 -mb-4"></img>
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">TRACKS</h1>
        </div>
      </motion.div>
      <motion.div
        viewport={{ amount: 0.4 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        whileInView={{ opacity: 1 }}
        onViewportEnter={() => sequence()}
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
            className="text-gray-300 absolute -bottom-10 right-0 px-5 cursor-pointer"
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
