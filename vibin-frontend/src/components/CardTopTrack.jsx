function CardTopTrack({ title, artists, cover }) {
  return (
    <div
      className="flex flex-col bg-cover bg-center rounded-md cursor-pointer relative hover:brightness-[0.6] transition-[filter] ease-in"
      style={{ backgroundImage: `url(${cover})` }}
    >
      <div className="absolute h-full w-full rounded-md bg-gradient-to-t from-neutral-900 bottom-0 left-0"></div>
      <div className="mt-auto mb-4 mx-3 z-10">
        <h2 className="text-gray-100 text-3xl line-clamp-2 pb-1 leading-tight ">
          {title}
        </h2>
        <h4 className="text-gray-300 line-clamp-1">
          {artists.reduce(
            (all_artists, artist, index) =>
              index + 1 < artists.length
                ? `${all_artists}${artist.name}, `
                : `${all_artists}${artist.name}`,
            ""
          )}
        </h4>
      </div>
    </div>
  );
}

export default CardTopTrack;
