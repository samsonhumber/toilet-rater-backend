// Removes the AWS type information contained in dynamodb outputs

export function processDynamoData(rawData) {
    const itemArr = rawData.Items;
    console.log(itemArr);
    let processedData = {};
    for (let i=0; i<itemArr.length; i++) {
        let majorKeys = Object.keys(itemArr[i]);
        console.log(majorKeys);
        majorKeys.forEach((keyI, indexI) => {
            let keyIType = Object.keys(itemArr[i][keyI]);
            // Note you want to update this if there are booleans or binary types here
            if (keyIType === 'S' || keyIType === 'N') {
                let newValue = itemArr[keyI][keyIType];
                processedData[keyI] = newValue;
                console.log(newValue);
            } else if (keyIType === 'M') {
                let ratingsArr = [];
                let keysJ = Object.keys(itemArr[keyI][keyIType]);
                keysJ.forEach((ratingKey, index) => {
                    let newRatingObject = {};
                    newRatingObject[ratingKey] = itemArr[keyI][keyIType][ratingKey];
                    ratingsArr.push(newRatingObject);
                    console.log(newRatingObject);
                });
                processedData[keyI] = ratingsArr;
                console.log(ratingsArr);
            } else {
                console.log('My typing attempts did not go to plan...');
            }
        });
        
    }
    console.log(processedData);
    return processedData
}