import { useEffect, useState } from "react";

export default function useFetch(accessToken) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Fetching");

  const getTopGenre = async (items) => {
    let top = [null, 0];
    for (const key in items) {
      if (items[key] > top[1]) {
        [top[0], top[1]] = [key, items[key]];
      }
    }
    return top[0];
  };

  const getGenres = async (items) => {
    let genres = {};
    for (const item of items) {
      for (const genre of item.genres) {
        genres?.[genre] ? (genres[genre] += 1) : (genres[genre] = 1);
      }
    }
    return genres;
  };

  useEffect(() => {
    let existingData = sessionStorage.getItem("vibin-stats");
    if (existingData) {
      setData(JSON.parse(existingData));
      setStatus("Success");
      return;
    }

    (async () => {
      if (accessToken) {
        try {
          const topArtistsResponse = await fetch(
            "/api/top-artists?access_token=" + accessToken
          );
          const topTracksResponse = await fetch(
            "/api/top-tracks?access_token=" + accessToken
          );
          const userProfileResponse = await fetch(
            "/api/user-profile?access_token=" + accessToken
          );

          if (
            !(
              topTracksResponse.ok &&
              topArtistsResponse.ok &&
              userProfileResponse.ok
            )
          ) {
            throw topArtistsResponse || topTracksResponse;
          }
          const topTracks = await topTracksResponse.json();
          const topArtists = await topArtistsResponse.json();
          const userProfile = await userProfileResponse.json();
          const genres = await getGenres(topArtists.items);
          const topGenre = await getTopGenre(genres);

          const result = {
            topTracks: topTracks,
            topArtists: topArtists,
            userProfile: userProfile,
            genreCount: Object.keys(genres).length,
            topGenre: topGenre,
          };

          setData(result);
          setStatus("Success");
          sessionStorage.setItem("vibin-stats", JSON.stringify(result));
        } catch (error) {
          setStatus("Failed");
        }
      }
    })();
  }, [accessToken]);

  return [data, status];
}
