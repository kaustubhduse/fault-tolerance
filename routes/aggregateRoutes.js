import express from 'express';
import * as controller from '../controllers/aggregateController.js';

const router = express.Router();

router.get('/', controller.getAggregates);

export default router;
