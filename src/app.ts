//configuarcion de express

import express from "express";
import morgan from "morgan";
import cors from "cors";
import personRoutes from './routes/person.routes'

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(personRoutes);

export default app;