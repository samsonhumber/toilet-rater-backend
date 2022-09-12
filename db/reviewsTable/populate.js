// Use PartiQL language to write commands - may need to get support on VS Code beforehand

import { DynamoDBClient, BatchExecuteStatementCommand, ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
export const REGION = "eu-west-2"; 
export const ddbClient = new DynamoDBClient({ region: REGION });
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const sampleReviewData = [
    {'id': '6', 'user': 'samsonhumber', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': {'decor': { N: '3' }, 'clean': { N: '2' }, 'ux':{ N: '3.5' }}, 'comment' : 'Not such a bad bog'},
    {'id': '7', 'user': 'otheerGuy34', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': {'overall': { N: '1' }}, 'comment' : 'pretty awful'}
];

async function populateReviews(entry) {
    //console.log(sampleReviewData[entry].id)
    const tableName = "Reviews";
    const params = {
        Statement: "INSERT INTO " + tableName + "  value  {'id':?, 'user':?, 'toilet':?, 'gridref':?, 'ratings':?, 'comment':?}", 
        Parameters: [{ S: sampleReviewData[entry].id },
        { S: sampleReviewData[entry].user },
        { S: sampleReviewData[entry].toilet },
        { S: sampleReviewData[entry].gridref },
        { M: sampleReviewData[entry].ratings },
        { S: sampleReviewData[entry].comment }]
      };
    try {
        await ddbDocClient.send(new ExecuteStatementCommand(params));
        console.log("Review", sampleReviewData[entry].id, "added by", sampleReviewData[entry].user, "for toilet", sampleReviewData[entry].toilet);
        return "Run successfully"; // For unit tests.
      } catch (err) {
        console.error(err);
      }
}

for(let i=0; i<sampleReviewData.length; i++) {
    populateReviews(i);
}
