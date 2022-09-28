import { ddbDocClient } from "../db/dynamoClient.js";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData, formatRatingsForDynamo } from './auxFunctions.js';

export async function deleteUniqueReview(uniqueReviewKey) {
    const params = {
        Statement: `DELETE FROM "Reviews" WHERE "user"=? AND "time"=? RETURNING ALL OLD *`,
        Parameters: [{ S: uniqueReviewKey.reviewUser }, { S: uniqueReviewKey.reviewTime }],
    };
    
  try {
    console.log(params);
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query deleted a review for", data.Items[i].toilet,
        data.Items[i].user,
        data.Items[i].ratings,
        data.Items[i].comment
      );
    }
    return data.Items;
  } catch (err) {
    console.error(err);
  }
}