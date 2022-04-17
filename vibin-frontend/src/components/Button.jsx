function Button({ onclick }) {
  return (
    <div
      className="bg-green-600 py-2 px-3 rounded-lg text-white font-normal hover:bg-green-700 cursor-pointer transition-all ease-in hover:text-gray-200 text-xl"
      onClick={onclick}
    >
      Login with Spotify
    </div>
  );
}

export default Button;
