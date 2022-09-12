import { ddbDocClient } from "../db/dynamoClient";

export async function getReviewsFromToiletName(toiletName, gridRef) {
  const params = {
    Statement: "SELECT user, ratings, comment FROM " + Reviews + " WHERE toilet=? AND gridref=?",
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

export async function getReviewsFromUserName(userName) {
  const params = {
    Statement: "SELECT toilet, gridref, ratings, comment FROM " + Reviews + " WHERE user=?",
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
    return data;
  } catch (err) {
    console.error(err);
  }
};

