function Button({ onclick }) {
  return (
    <div
      className="bg-primary-dark py-2 px-3 rounded-lg text-white font-normal hover:bg-green-700 cursor-pointer transition-all ease-in hover:text-gray-300 text-xl"
      onClick={onclick}
    >
      Login with Spotify
    </div>
  );
}

export default Button;
