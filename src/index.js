// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/plus.login',
//                 'https://www.googleapis.com/auth/plus.profile.emails.read'];
// // The file token.json stores the user's access and refresh tokens, and is
// // created automatically when the authorization flow completes for the first
// // time.
// const TOKEN_PATH = path.join(process.cwd(), 'token.json');
// const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

// /**
//  * Reads previously authorized credentials from the save file.
//  *
//  * @return {Promise<OAuth2Client|null>}
//  */
// async function loadSavedCredentialsIfExist() {
//   try {
//     const content = await fs.readFile(TOKEN_PATH);
//     const credentials = JSON.parse(content);
//     return google.auth.fromJSON(credentials);
//   } catch (err) {
//     return null;
//   }
// }

// /**
//  * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
//  *
//  * @param {OAuth2Client} client
//  * @return {Promise<void>}
//  */
// async function saveCredentials(client) {
//   const content = await fs.readFile(CREDENTIALS_PATH);
//   const keys = JSON.parse(content);
//   const key = keys.installed || keys.web;
//   const payload = JSON.stringify({
//     type: 'authorized_user',
//     client_id: key.client_id,
//     client_secret: key.client_secret,
//     refresh_token: client.credentials.refresh_token,
//   });
//   await fs.writeFile(TOKEN_PATH, payload);
// }

// /**
//  * Load or request or authorization to call APIs.
//  *
//  */
// async function authorize() {
//   let client = await loadSavedCredentialsIfExist();
//   if (client) {
//     return client;
//   }
//   client = await authenticate({
//     scopes: SCOPES,
//     keyfilePath: CREDENTIALS_PATH,
//   });
//   if (client.credentials) {
//     await saveCredentials(client);
//   }
//   return client;
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// async function listLabels(auth) {
//   const gmail = google.gmail({version: 'v1', auth});
//   const res = await gmail.users.labels.list({
//     userId: 'me',
//   });
//   const labels = res.data.labels;
//   if (!labels || labels.length === 0) {
//     console.log('No labels found.');
//     return;
//   }
//   console.log('Labels:');
//   labels.forEach((label) => {
//     console.log(`- ${label.name}`);
//   });
// }

// authorize().then(listLabels).catch(console.error);

// to run this code commond node .

const {app} = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const socketIo = require('socket.io');
var fs = require('fs');
var https = require('https');
let io;

if (config.env == 'qa') {
var certificate  = fs.readFileSync('/root/deployment/ssl/6_39_C1.cer', 'utf8');
var ca = fs.readFileSync('/root/deployment/ssl/00_00_00_02.cer', 'utf8');
var privateKey = fs.readFileSync('/root/deployment/ssl/new-2023.key', 'utf8');
}
if (config.env == 'production') {
var certificate  = fs.readFileSync('/root/deployment/ssl/E_3E.cer', 'utf8');
var ca = fs.readFileSync('/root/deployment/ssl/_02.cer', 'utf8');
var privateKey = fs.readFileSync('/root/deployment/ssl/prod023.key', 'utf8');
}
if(config.env == 'production' || config.env == 'qa'){
var credentials = {key: privateKey, cert: certificate, ca:ca};


var server = https.createServer(credentials, app).listen(443);
}
else{

var server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

 io = socketIo(server);
 module.exports = { io };
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('emailSaved', (data) => {
    console.log('Email saved:', data);
    io.emit('emailSaved', data); 
  });

  socket.on('repliesSaved', (data) => {
    console.log('Replies saved:', data);
    io.emit('repliesSaved', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

}


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

