import { ddbDocClient } from "../db/dynamoClient.js";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData, formatRatingsForDynamo } from './auxFunctions.js';

export async function postToiletReview(newReview) {
  console.log(newReview);
  const params = {
    Statement: `INSERT INTO "Reviews" value {'user':?, 'toilet':?, 'gridref':?, 'time':?, 'ratings':?, 'comment':?}`,
    Parameters: [{ S: newReview.user }, { S: newReview.toilet }, { S: newReview.gridref }, { S: newReview.time }, { M: formatRatingsForDynamo(newReview.ratings) }, { S: newReview.comment }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
      console.log(
        "Success. The query posted a review for", newReview.toiletName,
        newReview.user,
        newReview.ratings,
        newReview.comment
      );
    //console.log("Success. The query posted a review");
    return data.Items;
  } catch (err) {
    console.error(err);
  }
}