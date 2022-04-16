import cover from "../assets/cover.png";

function CardTopArtist() {
  return (
    <div className="flex gap-4">
      <img
        src={cover}
        alt=""
        className="w-28 md:w-36 aspect-square object-cover rounded-3xl"
      />
      <div className="text-gray-200">
        <h2 className="text-2xl line-clamp-2">Lorem, ipsum</h2>
        <p>123 followers</p>
      </div>
    </div>
  );
}

export default CardTopArtist;
