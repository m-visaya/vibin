import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import "./index.css";
import ModalTop50 from "./components/ModalTop50";
import Welcome from "./components/Welcome";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import useFetch from "./useFetch";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [timeRange, setTimeRange] = useState("long_term");
  const [data, status] = useFetch(loggedIn);

  useEffect(() => {
    fetch("/api/session-active")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        window.location = "/api/login";
      })
      .then((res) => {
        setLoggedIn(res);
      });
  }, []);

  const login = () => {
    window.location = "/api/login";
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <>
      {modalVisible && (
        <ModalTop50
          handleClose={() => closeModal()}
          data={data.topTracks[timeRange]}
        />
      )}
      <div className="bg-secondary flex flex-col items-center">
        <Welcome
          handleLogin={login}
          loggedIn={loggedIn}
          status={status}
        ></Welcome>
        {data && [
          <TopTracks
            handleModal={() => (modalVisible ? closeModal() : openModal())}
            handleTimeRange={setTimeRange}
            data={data.topTracks}
            timeRange={timeRange}
            key="container-top-tracks"
          ></TopTracks>,
          <TopArtists
            data={data.topArtists}
            key="container-top-artists"
          ></TopArtists>,
        ]}
      </div>
    </>
  );
}

export default App;
