import { useEffect, useState } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        return;
      }

      const [topArtistsResponse, topTracksResponse] = await Promise.all([
        fetch("/api/top-artists?items=4"),
        fetch("/api/top-tracks"),
      ]);

      if (!(topTracksResponse.ok && topArtistsResponse.ok)) {
        throw topArtistsResponse || topTracksResponse;
      }

      const topTracks = await topTracksResponse.json();
      const topArtists = await topArtistsResponse.json();
      setData({ topTracks: topTracks, topArtists: topArtists });
    })();
  }, []);

  return [data, (state) => setLoggedIn(state)];
}
