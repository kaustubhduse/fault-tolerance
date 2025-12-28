import express from 'express';
import * as controller from '../controllers/ingestController.js';

const router = express.Router();

router.post('/', controller.ingest);

export default router;
