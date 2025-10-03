import Zod from "zod";

import { createSchemaFromEnvironmentObject } from "@/validators/environment-variables/SchemaFromEnvironmentObject";

type ServerEnvironment = Zod.infer<typeof environmentSchema>;

const environmentObject = {
  SHYFTOFF_AGENT_TRAINER_API_URL: process.env.SHYFTOFF_AGENT_TRAINER_API_URL,
} as const;

/**
 * Server environment schema.
 *
 * Ensures required variables exist and are well-formed.
 */
const environmentSchema = createSchemaFromEnvironmentObject(environmentObject, {
  SHYFTOFF_AGENT_TRAINER_API_URL: Zod.string().url({ message: "Environment variable SHYFTOFF_AGENT_TRAINER_API_URL must be a valid URL" }),
});

/**
 * Validated server environment variables.
 *
 * Throws on invalid configuration (fail fast).
 */
const env: ServerEnvironment = environmentSchema.parse(environmentObject);

export { env, environmentSchema };
export type { ServerEnvironment };
