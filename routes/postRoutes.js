import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    await Post.createIndexes({ name: 'text', prompt: 'text' });
    const searchQuery = search
      ? {
          prompt: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    const posts = await Post.find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Post.countDocuments();

    res.status(200).json({ success: true, data: posts, count });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = new Post({
      name,
      prompt,
      photo: photoUrl.url,
    });
    const post = await newPost.save();

    res.status(200).json({ success: true, data: post, message: 'Created post successfully' });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;
