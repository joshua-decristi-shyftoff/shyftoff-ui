import type { LoginFormSchema } from "@/validators/Auth";

import { decodeJwt } from "jose";
import { cookies as getCookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import Zod from "zod";

import { env } from "@/validators/environment-variables/Server";

const SESSION_COOKIE_MAX_AGE_SECONDS = 3600;

/**
 * Decode a JWT access token payload.
 *
 * @param token - JWT string
 * @returns Decoded payload or undefined on failure
 */
const decodeAccessToken = (token: string) => {
  try {
    return decodeJwt(token);
  }
  catch {
    return undefined;
  }
};

/**
 * Determine if a JWT access token is expired.
 *
 * @param token - JWT string
 * @returns true if invalid or expired; false otherwise
 */
const isAccessTokenExpired = (token: string) => {
  const payload = decodeAccessToken(token);

  if (!payload || Number.isNaN(Number(payload.exp))) {
    return true;
  }

  const SECONDS_PER_MILLISECOND = 1000;
  const NO_TIME = 0;
  const nowSeconds = Math.floor(Date.now() / SECONDS_PER_MILLISECOND);

  return nowSeconds >= (payload.exp ?? NO_TIME);
};

/**
 * Fetch an access token from the backend using credentials.
 *
 * @param credentials - Login form data
 * @returns Token string or Error
 */
const getTokenFromBackend = async (credentials: LoginFormSchema) => {
  const tokenSchema = Zod.object({
    token: Zod.string({ message: "Token must be a valid string" }),
  });

  const { url, ...fetchConfig } = {
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
    method: "POST",
    url: `${env.SHYFTOFF_AGENT_TRAINER_API_URL}/api/tokens`,
  };

  return fetch(url, fetchConfig)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then(data => tokenSchema.parse(data).token)
    .catch((error: unknown) => error as Error);
};

class Profile {
  private static accessTokenCookieName = "shyftoff_access_token";

  /**
   * Validate access token from cookies and check expiration.
   *
   * @returns Token string if valid; false if missing/invalid/expired
   */
  static async validate() {
    const cookies = await getCookies().catch(error => error as Error);

    if (cookies instanceof Error)
      return false;

    const token = cookies.get(Profile.accessTokenCookieName)?.value;

    if (!token || isAccessTokenExpired(token))
      return false;

    return token;
  };

  /**
   * Authenticate with credentials and set the session cookie.
   *
   * @param credentials - Login form data
   * @returns Redirect on success or Error on failure
   */
  static async loginWithCredentials(credentials: LoginFormSchema) {
    const [token, cookies] = await Promise.all([
      getTokenFromBackend(credentials),
      getCookies().catch(error => error as Error),
    ]);

    if (cookies instanceof Error)
      return cookies;

    if (token instanceof Error)
      return token;

    cookies.set({
      httpOnly: true,
      maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
      name: Profile.accessTokenCookieName,
      path: "/",
      secure: true,
      value: token,
    });

    // Use Errors as values defer redirect as Error
    return permanentRedirect("/");
  }
}

export { Profile };
