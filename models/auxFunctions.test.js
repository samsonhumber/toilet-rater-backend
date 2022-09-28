import { test,expect } from '@jest/globals';
import { processDynamoData, formatRatingsForDynamo } from './auxFunctions.js';

const sampleDynamoData = {Items: [
    {"comment": {"S": "pretty awful",},
     "gridref": {"S": "YX241365",},
     "ratings": {"M": {"overall": {"N": "1",}, "clean": {"N": "2",}},},
     "time": {"S": "2022-09-12T16:34:10+00:00",},
     "toilet": {"S": "Yelverton WC",},
     "user": {"S": "otheerGuy34",},},
]};

const sampleRatingsArray = [{'overall': "1"}, {'clean': "2"}];

test('In the processDynamoData, expect it to remove type letters from sample data', () => {
    //ARRANGE
    const expected = [{"comment": "pretty awful",
    "gridref": "YX241365",
    "ratings": [{"overall": "1",}, {"clean": "2",}],
    "time": "2022-09-12T16:34:10+00:00",
    "toilet": "Yelverton WC",
    "user": "otheerGuy34",}];
    //ACT
    const actual = processDynamoData(sampleDynamoData); 
    //ASSERT
    expect(actual).toEqual(expected);
})

test('In the formatRatingsForDynamo, expect it to change the array of objects format to an object with AWS type headings', () => {
    //ARRANGE
    console.log(sampleDynamoData.Items[0].ratings.M);
    const expected = sampleDynamoData.Items[0].ratings.M;
    //ACT
    const actual = formatRatingsForDynamo(sampleRatingsArray); 
    //ASSERT
    expect(actual).toEqual(expected);
})