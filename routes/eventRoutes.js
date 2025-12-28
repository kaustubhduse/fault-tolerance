import express from 'express';
import * as controller from '../controllers/eventController.js';

const router = express.Router();

router.get('/processed', controller.getProcessed);
router.get('/failed', controller.getFailed);

export default router;
