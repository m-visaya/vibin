import { useState, useEffect } from "react";

export default function useAuth(state) {
  const [accessToken, setAccessToken] = useState(state);

  useEffect(() => {
    if (!accessToken) {
      const hashParams = location.hash?.substring(1);
      const token = hashParams
        ?.substring(0, hashParams.indexOf("&token_type"))
        .substring(13);
      const state = hashParams
        ?.substring(hashParams.indexOf("state="))
        .substring(6);

      history.replaceState(null, null, " ");
      if (token) {
        (async () => {
          try {
            const stateValid = await fetch("/api/verify-state?state=" + state);
            if (stateValid) {
              setAccessToken(token);
            }
          } catch (error) {
            console.log("Invalid State");
          }
        })();
      }
    }
  }, []);

  return [accessToken, setAccessToken];
}
