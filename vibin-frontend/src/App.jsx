import { useEffect, useState } from "react";
import "./index.css";
import ModalTop50 from "./components/ModalTop50";
import Welcome from "./components/Welcome";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(document.cookie);
  }, []);

  const login = () => {
    window.location = "http://localhost:5000/api/login";
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
      {modalVisible && <ModalTop50 onClose={() => closeModal()} />}
      <div className="bg-stone-800 flex flex-col items-center">
        <Welcome handleLogin={login} loggedIn={loggedIn}></Welcome>
        {loggedIn && [
          <TopTracks
            handleModal={() => (modalVisible ? closeModal() : openModal())}
          ></TopTracks>,
          <TopArtists></TopArtists>,
        ]}
      </div>
    </>
  );
}

export default App;
