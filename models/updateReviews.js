import { ddbDocClient } from "../db/dynamoClient.js";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData, formatRatingsForDynamo } from './auxFunctions.js';

export async function updateToiletReview(newReviewData) {
    let params;
    if(newReviewData.ratings && newReviewData.comment) {
        params = {
            Statement: `UPDATE "Reviews" SET "ratings"=? SET "comment"=? WHERE "user"=? AND "time"=?`,
            Parameters: [{ M: formatRatingsForDynamo(newReviewData.ratings) }, { S: newReviewData.comment }, { S: newReviewData.reviewUser }, { S: newReviewData.reviewTime }],
        };
    } else if(newReviewData.ratings) {
        params = {
            Statement: `UPDATE "Reviews" SET "ratings"=? WHERE "user"=? and "time"=?`,
            Parameters: [{ M: formatRatingsForDynamo(newReviewData.ratings) }, { S: newReviewData.reviewUser }, { S: newReviewData.reviewTime }],
        };
    } else if(newReviewData.comment) {
        params = {
            Statement: `UPDATE "Reviews" SET "comment"=? WHERE "user"=? and "time"=?`,
            Parameters: [{ S: newReviewData.comment }, { S: newReviewData.reviewUser }, { S: newReviewData.reviewTime }],
        };
    } else{
        throw "None or invalid information supplied to update review. Check your heading names";
    }
  
  try {
    console.log(params);
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query posted a review for", data.Items[i].toilet, ". Item " + i,
        data.Items[i].user,
        data.Items[i].ratings,
        data.Items[i].comment
      );
    }
    console.log("Success. The query updated a review");
    return data.Items;
  } catch (err) {
    console.error(err);
  }
}