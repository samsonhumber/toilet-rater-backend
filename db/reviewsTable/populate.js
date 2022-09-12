// Use PartiQL language to write commands - may need to get support on VS Code beforehand

import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import { ddbDocClient } from "../dynamoClient.js";

const sampleReviewData = [
    {'time': '2022-09-12T16:32:04+00:00', 'user': 'samsonhumber', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': {'decor': { N: '3' }, 'clean': { N: '2' }, 'ux':{ N: '3.5' }}, 'comment' : 'Not such a bad bog'},
    {'time': '2022-09-12T16:34:10+00:00', 'user': 'otheerGuy34', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': {'overall': { N: '1' }}, 'comment' : 'pretty awful'}
];

async function populateReviews(entry) {
    const tableName = "Reviews";
    const params = {
        Statement: "INSERT INTO " + tableName + "  value  {'time':?, 'user':?, 'toilet':?, 'gridref':?, 'ratings':?, 'comment':?}", 
        Parameters: [{ S: sampleReviewData[entry].time },
        { S: sampleReviewData[entry].user },
        { S: sampleReviewData[entry].toilet },
        { S: sampleReviewData[entry].gridref },
        { M: sampleReviewData[entry].ratings },
        { S: sampleReviewData[entry].comment }]
      };
    try {
        await ddbDocClient.send(new ExecuteStatementCommand(params));
        console.log("Review", sampleReviewData[entry].time, "added by", sampleReviewData[entry].user, "for toilet", sampleReviewData[entry].toilet);
        return "Run successfully"; // For unit tests.
      } catch (err) {
        console.error(err);
      }
}

for(let i=0; i<sampleReviewData.length; i++) {
    populateReviews(i);
}
