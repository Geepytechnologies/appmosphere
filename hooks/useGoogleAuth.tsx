import { useEffect, useState } from "react";

import { Urls } from "@/constants/Urls";

import { auth } from "@/api/endpoints";
import { IApiResponse } from "@/interfaces/common/api.inetrface";
import { IloginResponse } from "@/interfaces/responses/auth.interface";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios, { AxiosResponse } from "axios";

export function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "1063879023661-sjrdjfa3ioqm375h2ag2g7pr3dhtoj0g.apps.googleusercontent.com",
    });
  }, []);

  async function signInWithGoogle({ pushToken }: { pushToken: string | null }) {
    setLoading(true);
    setError(null);

    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();

      console.log("Google User:", googleUser);

      const idToken = googleUser.data?.idToken;
      if (!idToken) throw new Error("Google ID Token is missing");

      //🔥 Send the ID token to your backend API
      const response = await axios.post<
        any,
        AxiosResponse<IApiResponse<IloginResponse>>
      >(`${Urls.APIURL}${auth.googleAuth}`, {
        idToken,
        // pushToken,
      });
      console.log({ res: response });
      return response;
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  }
  return { user, loading, error, signInWithGoogle };
}
