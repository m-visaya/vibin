import { motion } from "framer-motion";

import StatsChart from "./StatsChart";

function ListeningStats({ data }) {
  return (
    <motion.div
      className="section bg-secondary"
      viewport={{
        amount: 0.3,
        once: true,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p className="text-gray-200 text-5xl md:text-6xl font-bold uppercase md:mt-10 text-center">
        Your <span className="text-primary block sm:inline"> Listening </span>
        Stats
      </p>
      <StatsChart data={data} />
    </motion.div>
  );
}

export default ListeningStats;
