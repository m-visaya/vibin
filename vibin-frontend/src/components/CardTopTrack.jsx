import cover from "../assets/cover.png";

function CardTopTrack(props) {
  return (
    <div
      className="flex flex-col bg-cover bg-center rounded-xl cursor-pointer relative hover:brightness-[0.6] transition-[filter] ease-in"
      style={{ backgroundImage: `url(${props.cover})` }}
    >
      <div className="absolute h-full w-full rounded-xl bg-gradient-to-t from-stone-900 bottom-0 left-0"></div>
      <div className="mt-auto mb-3 mx-2 z-10">
        <h2 className="text-gray-50 text-3xl line-clamp-2">{props.title}</h2>
        <h4 className="text-gray-50 line-clamp-1">{props.artists}</h4>
      </div>
    </div>
  );
}

export default CardTopTrack;
