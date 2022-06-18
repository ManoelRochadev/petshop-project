require('dotenv').config()
import express from 'express'
import mongoose from 'mongoose'
import { routes } from './routes'
import cors from 'cors'
const app = express();

app.use(cors())

app.use(express.json())

app.use(routes)

const databaseLink = process.env.MONGODB_URL as string

mongoose
  .connect(databaseLink)
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(err => console.log(err));

app.listen(process.env.PORT || 4000, () => {
  console.log(`server on`);
});
