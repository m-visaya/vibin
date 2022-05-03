import { animate, motion, useAnimation } from "framer-motion";
import { useState } from "react";

function TopGenre({ genreCount, topGenre }) {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  const startSequence = async () => {
    await startCount();
    return await controls.start(() => ({
      transition: { delay: 1.75 },
      y: 0,
      opacity: 1,
    }));
  };

  const startCount = async () => {
    animate(0, parseInt(genreCount), {
      duration: 1,
      delay: 0.5,
      onUpdate(value) {
        setCount(value.toFixed(0));
      },
    });
    setCount(0);
  };

  return (
    <motion.div
      viewport={{ amount: 0.6, once: true }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={startSequence}
      className="section lg:flex-row w-full max-w-6xl leading-none"
    >
      <div className="w-1/2 flex flex-col items-center text-gray-300">
        <p className="text-lg lg:text-2xl -mb-6">your music palette includes</p>
        <motion.h2
          viewport={{ amount: 0.6, once: true }}
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-primary text-[10rem] lg:text-[15rem] font-bold"
        >
          {count}
        </motion.h2>
        <p className="text-5xl lg:text-6xl text-gray-100 font-medium -mt-3">
          genres
        </p>
      </div>
      <motion.div
        animate={controls}
        initial={{ y: 200, opacity: 0 }}
        className="mt-20 lg:mt-0 w-1/2 flex flex-col items-center text-gray-300"
      >
        <h2 className="text-primary text-8xl lg:text-9xl font-bold uppercase">
          {topGenre}
        </h2>
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 3.5 }}
          className="md:text-2xl"
        >
          is your top genre
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default TopGenre;
