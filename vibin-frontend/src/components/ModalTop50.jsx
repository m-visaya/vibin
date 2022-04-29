import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import CardTop50Tracks from "./CardTop50Tracks";

function ModalTop50({ handleClose, data, timeRange }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-screen h-screen bg-stone-900 fixed flex justify-center items-center content-center bg-opacity-95 z-50"
    >
      <motion.div
        initial={{ opacity: 0, y: 500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        exit={{ opacity: 0, y: 500 }}
        className="w-full h-full rounded-xl opacity-100 flex flex-col items-center p-5 relative max-w-6xl"
      >
        <i
          className="bi bi-x-circle absolute top-0 sm:top-7 right-0 text-gray-300 mx-8 my-4 text-3xl hover:text-white cursor-pointer"
          onClick={handleClose}
        ></i>
        <h4 className="bg-primary text-black px-3 rounded-md mb-2 font-medium">
          {timeRange == "short_term"
            ? "Most Recent"
            : timeRange == "medium_term"
            ? "Past Months"
            : "All Time"}
        </h4>
        <h2 className="text-gray-300 text-5xl font-bold uppercase">
          Top 50 <span className="text-primary">Tracks</span>
        </h2>
        <div className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-6 w-full lg:gap-x-32 overflow-y-auto px-12">
          {data &&
            data.items.map((item, index) => {
              return (
                <CardTop50Tracks
                  rank={index + 1}
                  title={item.name}
                  artists={item.artists}
                  key={index}
                  cover={item.album.images[0].url}
                ></CardTop50Tracks>
              );
            })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ModalTop50;
