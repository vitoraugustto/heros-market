import { Router } from 'express';
import multer from 'multer';

import Item from '../models/Item.js';
import cloudinary from '../services/cloudinary.js';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  const image = req.file;
  const { name, description, role, status } = req.body;

  const item = {
    name,
    description,
    role,
    status,
    image,
  };

  try {
    await cloudinary.v2.uploader.upload(
      image.path,
      { public_id: image.originalname.split('.')[0] },
      (_, result) => {
        item.image = result.url;
      }
    );
  } catch (error) {
    res.status(500).json({ error });
  }

  if (!name || !description || !role || Object.keys(item.status).length === 0) {
    res.status(422).json({
      error: 'Name, description, role, status and image are required.',
    });
    return;
  }

  try {
    await Item.create(item);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/', async (_, res) => {
  try {
    const items = await Item.find();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findOne({ _id: id });

    if (!item) {
      res.status(422).json({ message: 'Item not found.' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const { name, description, role, status, image } = req.body;
  const item = {
    name,
    description,
    role,
    status,
    image,
  };

  try {
    const updatedItem = await Item.updateOne({ _id: id }, item);

    if (updatedItem.matchedCount === 0) {
      res.status(422).json({ message: 'Item not found.' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const item = await Item.findOne({ _id: id });

  if (!item) {
    res.status(422).json({ message: 'Item not found.' });
    return;
  }

  try {
    await Item.deleteOne({ _id: id });

    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
