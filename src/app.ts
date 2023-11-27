import express,{ Request, Response, NextFunction } from 'express';
import morgan from "morgan";
import cors from "cors";
import personRoutes from './routes/person.routes'

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(personRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.json({
        message: err.message
    })
});

export default app;