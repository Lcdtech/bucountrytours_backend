const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('./config');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const transport1 = new winston.transports.DailyRotateFile({
  filename: `${logDirectory}/application-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const transport2 = new winston.transports.DailyRotateFile({
  level: 'error',
  filename: `${logDirectory}/application-error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ timestamp, level, message }) => {
      if (level === 'error') {
        console.error(`${timestamp} ${level}: ${message}`); // This prints the error to the console
      }
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: `${logDirectory}/exceptions.log` }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: `${logDirectory}/rejections.log` }),
  ],
});

module.exports = logger;