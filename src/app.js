const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const cron = require('node-cron');
const { fetchAllEmails, saveEmailToDatabase,loadSavedCredentialsIfExist1 ,fetchAndSaveEmails} = require('./utils/worker_email'); 
const { Email, GmailUser } = require('./models'); 
const { Op } = require('sequelize');
const path = require('path');
const whatsappService = require('./services/whatsapp.service');
const dotenv = require('dotenv');
const fs = require('fs'); 
dotenv.config();

const app = express();

const uploadsDir = path.join(__dirname, '../uploads'); 
const templateDir = path.join(__dirname, '../template'); 
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); 
}

if (!fs.existsSync(templateDir)) {
  fs.mkdirSync(templateDir, { recursive: true }); 
}

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(compression());

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/uploads', express.static(templateDir));

app.use('/v1', routes);

app.use((req, res, next) => {
  next();
});

app.use(errorConverter);

app.use(errorHandler);

cron.schedule(`*/${process.env.CRON_MIN} * * * *`, fetchAndSaveEmails);

async function initWhatsapp(){

  const whatsapp=await whatsappService.initializeClientAndGenerateQr(null)
}
initWhatsapp();

module.exports = { app };