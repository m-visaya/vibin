import { useState } from "react";
import "./index.css";
import ModalTop50 from "./components/ModalTop50";
import Welcome from "./components/Welcome";
import TopArtists from "./components/TopArtists";
import TopTracks from "./components/TopTracks";

function App() {
  const [modalVisible, setModalVisible] = useState(false);

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
        <Welcome></Welcome>
        <TopTracks
          handleModal={() => (modalVisible ? closeModal() : openModal())}
        ></TopTracks>
        <TopArtists></TopArtists>
      </div>
    </>
  );
}

export default App;
