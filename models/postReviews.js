import { ddbDocClient } from "../db/dynamoClient.js";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { processDynamoData } from './auxFunctions.js';

export async function postReviewsForToilet(userName, toiletName, gridRef, ratings, comment) {
    let response;
    return response.rows
}