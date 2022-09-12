import {DynamoDB} from "@aws-sdk/client-dynamodb";

async function createReviews() {
    const dynamoDB = new DynamoDB;
    const data = await dynamoDB.createTable({
      TableName : "Reviews",
      AttributeDefinitions: [
        {
          AttributeName: "time",
          AttributeType: "S",
        },
        {
          AttributeName: "user",
          AttributeType: "S",
        },
      ],
      KeySchema: [
          {
              AttributeName: "time",
              KeyType: "HASH", //Partition key
          },
          {
            AttributeName: "user",
            KeyType: "RANGE", //Sort key
        }
      ],
      BillingMode: "PAY_PER_REQUEST",
    })
  console.log("Success!", data)
  return data
}

createReviews();
