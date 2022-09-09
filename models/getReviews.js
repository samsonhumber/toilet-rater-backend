import {DynamoDB} from '@aws-sdk/client-dynamodb';

export async function getReviewsFromToiletName(toiletName, gridRef) {
    const result = await reviewPool.query(
        `SELECT id, user, overall, clean, decor, ux, comment
        FROM Reviews
        WHERE LOWER(toilet)=LOWER($1) AND LOWER(gridRef)=LOWER($2);`,
        [toiletName, gridRef]
      );
      
      if (result.length > 0) {
        return result;
      } else {
        return [];
      }
}