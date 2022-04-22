import { motion } from "framer-motion";

import iconDisc from "../assets/top-tracks-disc.svg";
import iconExpand from "../assets/expand.svg";
import CardTopTrack from "./CardTopTrack";

function TopTracks({ data, timeRange, handleTimeRange, handleModal }) {
  const tracks = data[timeRange].items.slice(0, 5);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: "all" }}
        className="section"
      >
        <div className="relative text-center flex flex-col -mt-36">
          <img src={iconDisc} className="h-36 -mb-4"></img>
          <h1 className="text-gray-300">YOUR TOP</h1>
          <h1 className="text-primary">TRACKS</h1>
        </div>
      </motion.div>
      <div className="section">
        <div className="flex mb-10 -mt-10 gap-x-20 text-gray-300">
          <p
            className="time-range"
            onClick={() => handleTimeRange("long_term")}
          >
            All Time
          </p>
          <p
            className="time-range"
            onClick={() => handleTimeRange("medium_term")}
          >
            Past Months
          </p>
          <p
            className="time-range"
            onClick={() => handleTimeRange("short_term")}
          >
            Most Recent
          </p>
        </div>
        <div className="grid md:h-4/6 h-5/6 md:grid-rows-2 md:grid-cols-3 top-tracks lg:gap-8 gap-4 grid-cols-2 grid-rows-3 max-w-5xl relative px-5">
          {data &&
            tracks.map((item, index) => {
              return (
                <CardTopTrack
                  title={item.name}
                  artists={item.artists}
                  cover={item.album.images[0].url}
                  key={"top-track-" + index}
                />
              );
            })}
          <p
            className="text-gray-300 absolute -bottom-10 right-0 px-5 cursor-pointer"
            onClick={handleModal}
          >
            view top 50
            <img src={iconExpand} alt="expand" className="inline w-5 mb-2" />
          </p>
        </div>
      </div>
    </>
  );
}

export default TopTracks;
