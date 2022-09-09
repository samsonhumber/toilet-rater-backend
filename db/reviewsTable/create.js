import {DynamoDB} from "@aws-sdk/client-dynamodb";

async function createReviews() {
    const dynamoDB = new DynamoDB;
    const data = await dynamoDB.createTable({
      TableName : "Reviews",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        }
      ],
      KeySchema: [
          {
              AttributeName: "id",
              KeyType: "HASH", //Partition key
          }
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  console.log("Success!", data)
  return data
}
