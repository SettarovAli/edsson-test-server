import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import documentsRoutes from './routes/documents.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

documentsRoutes(app);

app.listen(port, () => {
  console.log('⚡️ [server]: Server running on port ' + port);
});
