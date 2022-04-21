import { motion } from "framer-motion";

import "../index.css";
import Button from "./Button";
import logoTagline from "../assets/logo-tagline.svg";
import bgDisc from "../assets/bg-disc.svg";
import iconScrollDown from "../assets/icon-scroll-down.svg";

function Welcome({ loggedIn, handleLogin, status }) {
  return (
    <div className="relative overflow-hidden w-full">
      <div className="section mx-auto">
        <motion.img
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          src={bgDisc}
          alt="bgDisc"
          className="absolute bottom-[80%] h-2/5 rotate-45 lg:hidden"
        />
        <motion.img
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          src={bgDisc}
          alt="bgDisc"
          className="absolute right-[80%] h-5/6 rotate-45 hidden lg:block"
        />
        <motion.img
          animate={{ rotate: -360 }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear",
          }}
          src={bgDisc}
          alt="bgDisc"
          className="absolute left-[80%] h-5/6 hidden lg:block"
        />
        <img src={logoTagline} alt="app-logo" className="h-72 my-16" />
        {displayStatus(loggedIn, status, handleLogin)}
      </div>
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
    } else if (status == "Error") {
      return (
        <p className="text-gray-300 mt-2" key="subheader">
          something went wrong
        </p>
      );
    } else {
      return [
        <img src={iconScrollDown} alt="" />,
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
