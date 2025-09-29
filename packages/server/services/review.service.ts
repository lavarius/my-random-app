import { reviewRepository } from '../repositories/review.respository';
import { llmClient } from '../llm/client';
import template from '../prompts/summarize-reviews.txt';

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      // check for any summary below expiresAt date
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);

      if (existingSummary) {
         return existingSummary;
      }

      // Get the last 10 reviews
      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      // send the reviews to a LLM for summarisation
      const prompt = template.replace('{{reviews}}', joinedReviews);

      const summary = await llmClient.summarize(joinedReviews);

      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
