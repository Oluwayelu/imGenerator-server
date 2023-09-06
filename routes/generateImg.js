import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from imGenerator API' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });

    const photo = response.data.data[0].url;
    res.status(200).json({ photo, message: 'Image generated successfully' });
  } catch (error) {
    res.status(400).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
