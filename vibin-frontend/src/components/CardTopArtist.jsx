function CardTopArtist({ name, followers, cover }) {
  return (
    <div className="flex gap-4">
      <img
        src={cover}
        alt=""
        className="w-28 md:w-36 aspect-square object-cover rounded-3xl"
      />
      <div className="text-gray-300">
        <h2 className="text-2xl line-clamp-2">{name}</h2>
        <p>{formatFollowers(followers)} followers</p>
      </div>
    </div>
  );
}

function formatFollowers(val) {
  if (val > 999999) {
    return `${Math.floor(val / 1000000)}M`;
  } else if (val > 999) {
    return `${Math.floor(val / 1000)}K`;
  }
  return val;
}

export default CardTopArtist;
