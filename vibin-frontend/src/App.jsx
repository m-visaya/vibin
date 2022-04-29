import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import "./index.css";
import ModalTop50 from "./components/ModalTop50";
import Welcome from "./components/Welcome";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";
import useFetch from "./useFetch";
import useAuth from "./useAuth";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [timeRange, setTimeRange] = useState("long_term");
  const [accessToken, setAccessToken] = useAuth(null);
  const [data, status] = useFetch(accessToken);

  const login = () => {
    location.replace("/api/auth");
  };

  const closeModal = () => {
    setModalVisible(false);
    document.getElementById("body").style.overflowY = "auto";
  };
  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      document.getElementById("body").style.overflowY = "hidden";
    }, 400);
  };

  return (
    <>
      <AnimatePresence>
        {modalVisible && (
          <ModalTop50
            handleClose={() => closeModal()}
            data={data.topTracks[timeRange]}
            timeRange={timeRange}
          />
        )}
      </AnimatePresence>
      <div className="bg-secondary flex flex-col items-center snap-y snap-proximity overflow-auto h-screen overflow-x-hidden">
        <Welcome
          handleLogin={login}
          loggedIn={accessToken || data}
          status={status}
          userProfile={data?.userProfile}
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
