import express, { response } from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { ReviewController } from './controllers/review.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', ReviewController.getReviews);
router.post(
   '/api/products/:id/reviews/summarize',
   ReviewController.summarizeReviews
);
export default router;
