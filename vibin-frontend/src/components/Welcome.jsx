import "../index.css";
import logoTagline from "../assets/logo-tagline.svg";
import Button from "./Button";

function Welcome({ loggedIn, handleLogin }) {
  return (
    <>
      <div className="section">
        <img src={logoTagline} alt="app-logo" className="h-60 my-16" />
        {!loggedIn && [
          <Button onclick={handleLogin} key="button"></Button>,
          <p className="text-gray-300 mt-2" key="subheader">
            to get started
          </p>,
        ]}
      </div>
    </>
  );
}

export default Welcome;
