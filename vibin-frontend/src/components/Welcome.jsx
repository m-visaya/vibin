import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import "../index.css";
import Button from "./Button";
import UserProfile from "./UserProfile";
import logoTagline from "../assets/logo-tagline.svg";
import bgDisc from "../assets/bg-disc.svg";

function Welcome({ loggedIn, handleLogin, status, userProfile }) {
  const controls = useAnimation();

  const sequence = async () => {
    await controls.start((i) => ({
      x: [i < 1 ? "50%" : "-50%", "0%"],
      opacity: [0, 1],
      transition: { duration: 1 },
    }));
    return await controls.start((i) => ({
      rotate: 360 * i,
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: "linear",
      },
    }));
  };

  useEffect(() => {
    sequence();
  }, []);

  return (
    <div className="relative overflow-hidden w-full mx-auto min-h-screen snap-center flex justify-center content-center items-center flex-col">
      {userProfile && <UserProfile data={userProfile} />}
      <motion.img
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        src={bgDisc}
        alt="bgDisc"
        className="absolute h-2/5 rotate-45 lg:hidden"
      />
      <motion.img
        animate={controls}
        custom={1}
        src={bgDisc}
        alt="bgDisc"
        className="absolute right-[80%] h-5/6 rotate-90 hidden lg:block"
      />
      <motion.img
        animate={controls}
        custom={-1}
        src={bgDisc}
        alt="bgDisc"
        className="absolute left-[80%] h-5/6 hidden lg:block"
      />
      <motion.img
        animate={{ y: ["70%", "0%"], opacity: [0, 1] }}
        transition={{ duration: 1 }}
        src={logoTagline}
        alt="app-logo"
        className="h-72 my-24"
      />
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.75, delay: 0.75 }}
        className="flex flex-col items-center"
      >
        {displayStatus(loggedIn, status, handleLogin)}
      </motion.div>
    </div>
  );
}

function displayStatus(loggedIn, status, handleLogin) {
  if (loggedIn) {
    if (status == "Fetching") {
      return (
        <p className="text-gray-300 mt-2" key="subheader">
          fetching data
        </p>
      );
    } else if (status == "Failed") {
      return (
        <p className="text-gray-300 mt-2" key="subheader">
          something went wrong
        </p>
      );
    } else {
      return [
        <div className="bg-gray-50 h-[50px] w-[30px] rounded-xl py-1 flex flex-col items-center content-center">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ y: [0, 0, 25], opacity: [1, 1, 1, 1, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="h-[20px] aspect-square bg-primary-dark rounded-full"
          />
        </div>,

        <p className="text-gray-300 mt-2">scroll down to start</p>,
      ];
    }
  }
  return [
    <Button onclick={handleLogin} key="button"></Button>,
    <p className="text-gray-300 mt-2" key="subheader">
      to get started
    </p>,
  ];
}

export default Welcome;
