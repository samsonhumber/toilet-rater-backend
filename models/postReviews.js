import { ddbDocClient } from "../db/dynamoClient.js";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData, formatRatingsForDynamo } from './auxFunctions.js';

export async function postToiletReview(newReview) {
  const params = {
    Statement: `INSERT INTO "Reviews" value {'user':?, 'toilet':?, 'gridref':?, 'time':?, 'ratings':?, 'comment':?}`,
    Parameters: [{ S: newReview.user }, { S: newReview.toiletName }, { S: newReview.gridRef }, { S: newReview.time }, { M: formatRatingsForDynamo(newReview.ratings) }, { S: newReview.comment }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query posted a review for", data.Items[i].toilet, ". Item " + i,
        data.Items[i].user,
        data.Items[i].ratings,
        data.Items[i].comment
      );
    }
    console.log("Success. The query posted a review");
    return data.Items;
  } catch (err) {
    console.error(err);
  }
}