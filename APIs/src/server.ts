require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import { routes } from './routes'
import cors from 'cors'
const app = express();

app.use(cors())

app.use(express.json())

app.use(routes)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const mongoHost = 'containers-us-west-62.railway.app'
const mongoPort = 7825

mongoose
  .connect(`mongodb://${dbUser}:${dbPassword}@${mongoHost}:${mongoPort}`)
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(err => console.log(err));

app.listen(process.env.PORT || 4000, () => {
  console.log(`server on`);
});
