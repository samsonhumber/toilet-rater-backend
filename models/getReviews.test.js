import { test,expect } from '@jest/globals';
import { getReviewsFromToiletName, getReviewsFromUserName } from './getReviews.js';
//import { sampleReviewData } from '../db/reviewsTable/populate.js'

const sampleReviewData = [
    {'time': '2022-09-12T16:32:04+00:00', 'user': 'samsonhumber', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': [{ 'clean': '2' }, { 'decor': '3' },  {'ux': '3.5' }], 'comment' : 'Not such a bad bog'},
    {'time': '2022-09-12T16:34:10+00:00', 'user': 'otheerGuy34', 'toilet': 'Yelverton WC', 'gridref': 'YX241365', 'ratings': [{'overall': '1' }], 'comment' : 'pretty awful'}
];


describe ('getReviewsFromToiletName tests', () => {
test('expects search for sample toilet to return the sample data', async () => {
    //ARRANGE
    const expected = sampleReviewData;
    //ACT 
    const actual = await getReviewsFromToiletName(sampleReviewData[0].toilet, sampleReviewData[0].gridref);
    //ASSERT
    expect(actual).toEqual(expected);
});

test('expects search for nonsensical name to return empty array', async () => {
    //ARRANGE
    const expected = [];
    //ACT
    const actual = await getReviewsFromToiletName('hghghghghghghghghghghghgh', 'no');
    //ASSERT
    expect(actual).toEqual(expected);
})
});

describe('getReviewsFromUserName tests', () => {
    test('expects search for my username to return one review', async () => {
        //ARRANGE
        const expected = [sampleReviewData[0]];
        //ACT
        const actual = await getReviewsFromUserName('samsonhumber');
        //ASSERT
        expect(actual).toEqual(expected);
    });
    
    test('expects search for the sample username to return the other review', async () => {
        //ARRANGE
        const expected = [sampleReviewData[1]];
        //ACT
        const actual = await getReviewsFromUserName(sampleReviewData[1].user);
        //ASSERT
        expect(actual).toEqual(expected);
    })
})
