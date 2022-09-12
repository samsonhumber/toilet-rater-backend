import { test,expect } from '@jest/globals';
import { processDynamoData } from './auxFunctions.js';
const sampleRawData = {Items: [
    {"comment": {"S": "pretty awful",},
     "gridref": {"S": "YX241365",},
     "ratings": {"M": {"overall": {"N": "1",}, "clean": {"N": "2",}},},
     "time": {"S": "2022-09-12T16:34:10+00:00",},
     "toilet": {"S": "Yelverton WC",},
     "user": {"S": "otheerGuy34",},},
]};

test('In the processDynamoData, expect it to remove type letters from sample data', () => {
    //ARRANGE
    const expected = {"comment": "pretty awful",
    "gridref": "YX241365",
    "ratings": [{"overall": "1",}, {"clean": "2",}],
    "time": "2022-09-12T16:34:10+00:00",
    "toilet": "Yelverton WC",
    "user": "otheerGuy34",}
    //ACT
    const actual = processDynamoData(sampleRawData); 
    //ASSERT
    expect(actual).toEqual(expected);
})