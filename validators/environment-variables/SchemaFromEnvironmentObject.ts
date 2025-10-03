import Zod from "zod";

/**
 * Build a Zod schema from an environment object.
 *
 * @template EnvironmentObject - Environment object shape
 * @template Overrides - Optional per-key Zod overrides
 * @param object - Key/value map of env vars to validate
 * @param overrides - Optional Zod schemas to override defaults
 * @returns Zod object schema validating the provided keys
 *
 * @example
 * const envSchema = createSchemaFromEnvironmentObject(
 *   { API_URL: process.env.API_URL, PORT: process.env.PORT },
 *   { PORT: Zod.string().transform(Number) }
 * );
 */
const createSchemaFromEnvironmentObject = <
  EnvironmentObject extends Record<string, unknown>,
  Overrides extends Partial<Record<keyof EnvironmentObject, Zod.ZodTypeAny>> | undefined = undefined,
>(
  object: EnvironmentObject,
  overrides?: Overrides,
) => {
  type EnvironmentObjectSchema = { [K in keyof EnvironmentObject]: Zod.ZodString };
  type EnvironmentSchema = Zod.ZodObject<Overrides extends undefined
    ? EnvironmentObjectSchema
    : Omit<EnvironmentObjectSchema, keyof Overrides> & Overrides
  >;

  const schemaObject = Object.keys(object).reduce((schemaObject, key) => ({
    ...schemaObject,
    [key]: Zod.string(), // Default to basic string
  }), {});

  return Zod.object({ ...schemaObject, ...(overrides ?? {}) }) as EnvironmentSchema;
};

export { createSchemaFromEnvironmentObject };
