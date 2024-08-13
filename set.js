const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZNRVQyUXpjMXpGOXFFNXZXVFpyYUdYNk42TUk1Q1Z6OVFwRG9UZTJrND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR1dyclN4R1VzS0dlaVpuSTI5ZjIxdnRZdWpaTnNVbTFXUkVxRzFMVmN5bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVQk1GWExJdHlIVWRUeUdLUGhidmYxeDBCT1F2WUxleW4vZW9VaHpLbldvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMbE53UE5OOGV2UUh6MVY0NEdRS2xWTStvUThwWHZZVG9XVUpHc29IZG5nPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlOVlJGOUhjNjhZalV4K2dzYnVyZDRjYWhRTjF1Wk45eW1tR3B2UjE1WGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJWdzQ1YXovSHlNOVBWWWFuVFN3WDZnR3BjYXA1SUo3RWtOTXVKeWlCR0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BhNnV0TVFNNWNEWVhwandKK2tDWGxTVTJ6b3NCMmNSckk1Snl1VVhXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWZxVWpnN0F3ZXRPMGNnQjFISHJqNGZ4NVkza1c5Y09vY2RLS3paY3RITT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9LN0M3bGxrby8xYi8wc1lUZXlWa1ZBOFZLT3VjeXlkRXMvZ1kzOTNzR2IyRlgwRmYzcVAvaTZTMHhscUVoeUxySHBERlgvRlIrUUM1cUN6THdva0JBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ5LCJhZHZTZWNyZXRLZXkiOiJPei9RQ3U4OWozM0QwZnExcWxrNjBRT1pXSWI5TlJUTFNwcXdydXEyZHdNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoT29fSk1XalJZaWw2Q3JiMFdKYWh3IiwicGhvbmVJZCI6ImY2Mzc5MWU2LTg2YWUtNGVhNy05YWZkLWJkNTY5NjhmYjMzZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyNHpqa214d2I0Y2VhSXlEaVpkUFl1MVM3NUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXQzZUVMalF4RVBpNU81K3ZsQ0VJYUIrVnprPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpCSkRQNEgxIiwibWUiOnsiaWQiOiIyMzQ4MDgzMjA5Mzc4OjM0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkDhtKzhtLPhtLHhtLrhtLDhtKzwlqOCIOG0uOG0sSDhtLPhtL/htKzhtLrhtLAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09xRGprY1E1OXJzdFFZWUZpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImE3ek5UWWM2ckY2SzczQVZCL2NIUUZBU29FcnZ0T2pySHlPZ2k3Z2paVG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IlN6SFpKVHhRNUVRMjBBOE9LT3ZCYnMycU1VQ0hCSlBJdmZ6UDJHMXhUVHY3ZllnVnNSeFoyWE9CQi92OXVSQmZKY2ZsVWhiang0R3ExajIwSjVrK0NRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3UUVzQ3dZclVmUThNVTRlU1hvSTJUWDFoSVpKb2VISXFVejhKaE1McUExaGVvb0x0blZNZi9NYTNrem5LS2ZVOFgzdUxnME1MSTRjcnVqRkZjZkZCdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwODMyMDkzNzg6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV3U4elUySE9xeGVpdTl3RlFmM0IwQlFFcUJLNzdUbzZ4OGpvSXU0STJVNiJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzU0MjkwMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGRE8ifQ==',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "agenda",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348083209378",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
