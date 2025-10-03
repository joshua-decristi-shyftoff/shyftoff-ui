import Zod from "zod";

/**
 * HTTP status codes used across the app.
 *
 * Centralizes common codes for readability and consistency.
 */
enum HttpStatusCode {
  BAD_GATEWAY = 502,
  BAD_REQUEST = 400,
  CREATED = 201,
  FORBIDDEN = 403,
  FOUND = 302,
  GATEWAY_TIMEOUT = 504,
  INTERNAL_SERVER_ERROR = 500,
  MOVED_PERMANENTLY = 301,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  NOT_MODIFIED = 304,
  OK = 200,
  SERVICE_UNAVAILABLE = 503,
  TOO_MANY_REQUESTS = 429,
  UNAUTHORIZED = 401,
};

/**
 * Zod schema for HTTP status codes.
 *
 * Enables runtime validation where a status code is expected.
 */
const statusCodeSchema = Zod.enum(HttpStatusCode);

export { HttpStatusCode, statusCodeSchema };
