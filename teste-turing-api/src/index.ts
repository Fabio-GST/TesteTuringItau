const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
import dotenv from 'dotenv';

dotenv.config();

import { useRoutes } from './routes';

const PORT = process.env.PORT || 8091;

app.use(bodyParser.json());
useRoutes(app)

app.listen(PORT, () => console.log('Servidor rodando na porta : ', PORT))

