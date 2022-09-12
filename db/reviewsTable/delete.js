import {DynamoDB} from "@aws-sdk/client-dynamodb";

async function deleteReviews() {
    const dynamoDB = new DynamoDB;
    await dynamoDB.deleteTable({
        TableName: "Reviews",
    })
  console.log("Table has been deleted");
}

deleteReviews();