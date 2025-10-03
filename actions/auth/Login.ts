"use server";

import type { LoginFormSchema } from "@/validators/Auth";

import { ZodError } from "zod";

import { Profile } from "@/models/Profile";
import { loginSchema } from "@/validators/Auth";
import { HttpStatusCode } from "@/validators/StatusCodes";

/**
 * Authenticate via server action using credentials.
 *
 * @param credentials - Login form data
 * @returns Error object with message and status code
 *
 * Validates with Zod, delegates auth to `Profile`, and maps failures to a typed error.
 * Never throws.
 */
const loginWithCredentials = async (credentials: LoginFormSchema) => {
  const loginError = await Profile.loginWithCredentials(loginSchema.parse(credentials));

  if (loginError instanceof ZodError || loginError instanceof Error) {
    const errorMessage = (loginError.message === "Unauthorized")
      ? "Your username or password is incorrect"
      : loginError.message;

    return {
      message: errorMessage,
      status: HttpStatusCode.UNAUTHORIZED,
    };
  }

  return {
    message: "Something unexpected happened",
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
  };
};

export { loginWithCredentials };
