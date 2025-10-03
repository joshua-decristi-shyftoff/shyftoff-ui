import Zod from "zod";

type LoginFormSchema = Zod.infer<typeof loginSchema>;

const MIN_PASSWORD_LENGTH = 8;

/**
 * Username input schema.
 *
 * Currently accepts any string. Swap for an email schema if required.
 */
const usernameSchema = Zod.string();

/**
 * Zod schema for validating password input with comprehensive security requirements.
 *
 * @description
 * Enforces strong password requirements including:
 * - Minimum length of 8 characters
 * - At least one number
 * - At least one special character
 * - At least one lowercase letter
 * - At least one uppercase letter
 */
const passwordSchema = Zod
  .string()
  .min(MIN_PASSWORD_LENGTH, { message: "Password must be at least 8 characters" })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[!"#$%&()*,.:<>?@^{|}]/, { message: "Password must contain at least one special character" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" });

const loginSchema = Zod.object({
  password: passwordSchema,
  username: usernameSchema,
});

export { loginSchema };
export type { LoginFormSchema };
