import express, { response } from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { PrismaClient } from './generated/prisma';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   res.send('Hello World!');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello World!' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', async (req: Request, res: Response) => {
   const prisma = new PrismaClient();
   const productId = Number(req.params.id);

   if (isNaN(productId)) {
      // []
      // 400 (bad request)
      // /api/products/[Object object]/reviews
      res.status(400).json({ error: 'Invalid product ID' });
      return;
   }

   // SELECT * FROM review WHERE productId = @productId ORDER BY createdAt DESC
   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
   });

   res.json(reviews);
});
export default router;
