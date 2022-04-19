import { useEffect, useState } from "react";
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
  const [data, setData] = useFetch();

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
        setData(res);
      });
  }, []);

  const login = () => {
    window.location = "/api/login";
  };

  const closeModal = () => {
    setModalVisible(false);
    document.getElementById("body").style.overflowY = "auto";
  };
  const openModal = () => {
    setModalVisible(true);
    document.getElementById("body").style.overflowY = "hidden";
  };

  return (
    <>
      {modalVisible && (
        <ModalTop50
          handleClose={() => closeModal()}
          data={data.topTracks[timeRange]}
        />
      )}
      <div className="bg-stone-800 flex flex-col items-center">
        <Welcome handleLogin={login} loggedIn={loggedIn}></Welcome>
        {data && [
          <TopTracks
            handleModal={() => (modalVisible ? closeModal() : openModal())}
            handleTimeRange={setTimeRange}
            data={data.topTracks}
            timeRange={timeRange}
          ></TopTracks>,
          <TopArtists data={data.topArtists}></TopArtists>,
        ]}
      </div>
    </>
  );
}

export default App;
