import { useEffect, useState } from "react";

export default function useFetch(loggedIn) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Fetching");

  useEffect(() => {
    (async () => {
      if (!loggedIn) {
        return;
      }
      try {
        const topArtistsResponse = await fetch("/api/top-artists?items=4");
        const topTracksResponse = await fetch("/api/top-tracks");

        if (!(topTracksResponse.ok && topArtistsResponse.ok)) {
          throw topArtistsResponse || topTracksResponse;
        }

        const topTracks = await topTracksResponse.json();
        const topArtists = await topArtistsResponse.json();
        setData({ topTracks: topTracks, topArtists: topArtists });
      } catch (error) {
        setStatus("Failed");
      }
    })();
  }, [loggedIn]);

  return [data, status];
}
