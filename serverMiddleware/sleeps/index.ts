import express from 'express';
import dotenv from 'dotenv';
const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

dotenv.config();
const app = express();

app.use('/sleeps', express.raw({ type: 'application/json' }));

app.get('/sleeps', async (_, res) => {
  try {
    const doc = new GoogleSpreadsheet(process.env.SLEEPING_SHEET_ID);
    const cred = fs.readFileSync('gcredential.json');
    await doc.useServiceAccountAuth(JSON.parse(cred));
    await doc.loadInfo();

    const doctitle = doc.title;
    const sheet = await doc.sheetsById['0'];
    const rows = await sheet.getRows();
    const title = sheet._rawProperties.title;
    const headers = rows[0]._sheet.headerValues;

    let resjson = {
      title: doctitle,
      sheet_title: title,
      headers,
      ents: [] as string[][],
    };
    const ents = [] as string[][];
    for (const row of rows) {
      if (row._rawData[0] === '') {
        break;
      }
      ents.push(row._rawData);
    }
    resjson.ents = ents;

    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(resjson));
  } catch (error) {
    console.log(error);
    res.status(503);
    res.send('error');
  }
});

module.exports = app;
