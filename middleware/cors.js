import cors from "cors";

const ACCEPTED_ORIGIN = [
  "http://localhost:8000",
  "http://localhost:5500",
  "http://localhost:8080",
  "http://10.0.0.22:8080",
  "http://10.0.0.22:5500",
  "http://localhost:5173",
  "http://10.0.0.22:5173",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGIN } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });
