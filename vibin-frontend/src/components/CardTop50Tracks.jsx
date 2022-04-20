function CardTop50Tracks({ title, artists, rank, cover }) {
  return (
    <div className="flex gap-4 relative">
      <img
        src={cover}
        alt=""
        className="w-28 aspect-square object-cover rounded-xl"
      />
      <div className="text-gray-200">
        <h2 className="text-2xl line-clamp-2 leading-none">{title}</h2>
        <p className="line-clamp-1">
          {" "}
          {artists.reduce(
            (all_artists, artist, index) =>
              index + 1 < artists.length
                ? `${all_artists}${artist.name}, `
                : `${all_artists}${artist.name}`,
            ""
          )}
        </p>
      </div>
      <h3 className="absolute bottom-0 right-0 text-gray-200 text-4xl p-2 font-bold">
        {rank}
      </h3>
    </div>
  );
}

export default CardTop50Tracks;
