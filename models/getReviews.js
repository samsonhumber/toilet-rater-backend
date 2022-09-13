import { ddbDocClient } from "../db/dynamoClient";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData } from './auxFunctions.js';

export async function getReviewsFromToiletName(toiletName, gridRef) {
  // Restrict params to perhaps "user", "ratings", "comment"
  const params = {
    Statement: `SELECT * FROM "Reviews" where "toilet"=? AND "gridref"=?`,
    Parameters: [{ S: toiletName }, { S: gridRef }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query return the following reviews for", toiletName, ". Item " + i,
        data.Items[i].user,
        data.Items[i].ratings,
        data.Items[i].comment
      );
    }

    return processDynamoData(data);
  } catch (err) {
    console.error(err);
  }
};

export async function getReviewsFromUserName(userName) {
  const params = {
    Statement: `SELECT * FROM "Reviews" WHERE "user"=?`,
    Parameters: [{ S: userName }],
  };
  try {
    const data = await ddbDocClient.send(new ExecuteStatementCommand(params));
    for (let i = 0; i < data.Items.length; i++) {
      console.log(
        "Success. The query return the following reviews for", userName, ". Item " + i,
        data.Items[i].toilet,
        data.Items[i].gridref,
        data.Items[i].ratings,
        data.Items[i].comment
      );
    }
    
    return processDynamoData(data);
  } catch (err) {
    console.error(err);
  }
};

