import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import generateImgRoutes from './routes/generateImg.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/generate-img', generateImgRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from imGenerator AI API',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () => console.log('Server started on port', process.env.PORT));
  } catch (error) {
    console.log(error);
  }
};

startServer();
