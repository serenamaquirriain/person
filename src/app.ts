//configuarcion de express

import express from "express";
import morgan from "morgan";
import cors from "cors";
//import personsRoutes from './routes/persons.routes';

const app = express();

app.use(morgan("dev"));
app.use(cors());
//app.use(express.json());
//app.use(personsRoutes);

export default app;