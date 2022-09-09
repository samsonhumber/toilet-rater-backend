import {DynamoDB} from "@aws-sdk/client-dynamodb";

DynamoDB
  .createTable({
    TableName : "Toilets",
    AttributeDefinitions: [
      {
        AttributeName: "name",
        AttributeType: "S",
      },
      {
        AttributeName: "gridRef",
        AttributeType: "S"
    }
    ],
    KeySchema: [
        {
            AttributeName: "name",
            KeyType: "HASH", //Partition key
        },
        {
            AttributeName: "SongTitle",
            KeyType: "RANGE", //Sort Key
        }
    ],
    BillingMode: "PAY_PER_REQUEST"
  })
  .promise()
  .then(data => console.log("Success!", data))
  .catch(console.error)

  