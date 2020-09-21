import winston, { format } from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File({
      filename: "src/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/debug.log",
      level: "info",
    }),
  ],
});
