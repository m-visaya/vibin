import { motion } from "framer-motion";

function UserProfile({ data }) {
  const logOut = () => {
    sessionStorage.clear();
    location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.75 }}
      className="flex justify-center items-center absolute top-0 mt-16"
    >
      <img src={data.images[0].url} className="h-12 rounded-md" />
      <div className="flex flex-col ml-2">
        <p className="text-xl leading-tight text-primary-dark">
          {data.display_name}
        </p>
        <p
          className="text-sm font-light cursor-pointer text-gray-300 hover:text-white"
          onClick={logOut}
        >
          Logout
        </p>
      </div>
    </motion.div>
  );
}

export default UserProfile;
