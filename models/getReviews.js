export async function getReviewsFromToiletName(toiletName) {
    const result = await reviewPool.query(
        `SELECT * FROM ingredients WHERE
      LOWER(toilet) LIKE LOWER($1) LIMIT 5;`,
        [toiletName]
      );
      
      if (result.length > 0) {
        return result;
      } else {
        return [];
      }
}