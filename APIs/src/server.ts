require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import { routes } from './routes'
import cors from 'cors'
const app = express();

app.use(cors())

app.use(express.json())

app.use(routes)

const databaseLink = 'mongodb://mongo:h6avAvwcKhhHRniDXbZ3@containers-us-west-62.railway.app:7825'

mongoose
  .connect(databaseLink)
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(err => console.log(err));

app.listen(process.env.PORT || 4000, () => {
  console.log(`server on`);
});
