import { useEffect, useState } from "react";

export default function useFetch(accessToken) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Fetching");

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
            "/api/top-artists?items=4&access_token=" + accessToken
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
          setData({
            topTracks: topTracks,
            topArtists: topArtists,
            userProfile: userProfile,
          });
          setStatus("Success");
          sessionStorage.setItem(
            "vibin-stats",
            JSON.stringify({
              topTracks: topTracks,
              topArtists: topArtists,
              userProfile: userProfile,
            })
          );
        } catch (error) {
          setStatus("Failed");
        }
      }
    })();
  }, [accessToken]);

  return [data, status];
}
