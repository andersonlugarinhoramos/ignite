import express from 'express';
import { getCourse } from './routes';

const app = express();

app.get("/", getCourse)

app.listen(3333);