import cover from "../assets/cover.png";

function CardTop50Tracks(props) {
  return (
    <div className="flex gap-4 relative">
      <img
        src={cover}
        alt=""
        className="w-28 aspect-square object-cover rounded-xl"
      />
      <div className="text-gray-200">
        <h2 className="text-2xl line-clamp-2 leading-none">{props.title}</h2>
        <p>123 followers</p>
        <p className="mt-2 bg-green-500 text-gray-200 text-center rounded-md text-xs pb-1 w-fit px-2">
          genre
        </p>
      </div>
      <h3 className="absolute bottom-0 right-0 text-gray-200 text-4xl p-2 font-bold">
        {props.rank}
      </h3>
    </div>
  );
}

export default CardTop50Tracks;
