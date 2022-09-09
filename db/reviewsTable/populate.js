// Use PartiQL language to write commands - may need to get support on VS Code beforehand

import {DynamoDB} from "@aws-sdk/client-dynamodb";

async function populateReviews() {
    const dynamodb = new DynamoDB;
    let fullDatabaseQuery = []
    const databaseQuery = {
        Statement: `INSERT into Reviews value {  
        'id': '4',
        'overall': '3.5',
        'clean': '2',
        'decor' : '4',
        'ux' : '4',
        'comment' : 'Not such a bad bog"
        }`
    }
    fullDatabaseQuery.push(databaseQuery);
    const response = await dynamodb.executeTransaction(fullDatabaseQuery);
    return response;
}


