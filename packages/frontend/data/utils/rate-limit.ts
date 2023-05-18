import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export const applyMiddleware =
  (middleware: any) => (request: any, response: any) =>
    new Promise((resolve, reject) => {
      middleware(request, response, (result: unknown) =>
        result instanceof Error ? reject(result) : resolve(result)
      );
    });

const getIP = (request: any) => {
  var ip =
    request.ip ||
    request.headers["x-forwarded-for"] ||
    request.headers["x-real-ip"] ||
    request.connection.remoteAddress;
  return ip;
};

export const getRateLimitMiddlewares = ({
  limit = 2,
  windowMs = 600 * 1000,
  delayAfter = Math.round(10 / 2),
  delayMs = 500,
} = {}) => [
  slowDown({ keyGenerator: getIP, windowMs, delayAfter, delayMs }),
  rateLimit({ keyGenerator: getIP, windowMs, max: limit }),
];

const middlewares = getRateLimitMiddlewares();

export async function applyRateLimit(request: any, response: any) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map((middleware) => middleware(request, response))
  );
}
