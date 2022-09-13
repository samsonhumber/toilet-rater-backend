// Removes the AWS type information contained in dynamodb outputs

export function processDynamoData(rawData) {
    if(!rawData) {
        return [];
    } else {
    const itemArr = rawData.Items;
    let processedData = [];
    for (let i=0; i<itemArr.length; i++) {
        let processedDataEntry = {};
        let majorKeys = Object.keys(itemArr[i]);
        majorKeys.forEach((keyI, indexI) => {
            let keyIType = Object.keys(itemArr[i][keyI])[0];
            // Note you want to update this if there are booleans or binary types here
            if (keyIType === 'S' || keyIType === 'N') {
                let newValue = itemArr[i][keyI][keyIType];
                processedDataEntry[keyI] = newValue;
            } else if (keyIType === 'M') {
                let ratingsArr = [];
                let keysJ = Object.keys(itemArr[i][keyI][keyIType]);
                keysJ.forEach((ratingKey, index) => {
                    let newRatingObject = {};
                    newRatingObject[ratingKey] = Object.values(itemArr[i][keyI][keyIType][ratingKey])[0];
                    ratingsArr.push(newRatingObject);
                });
                processedDataEntry[keyI] = ratingsArr;
            } else {
                console.log('My typing attempts did not go to plan...');
            }
        });
        processedData.push(processedDataEntry);
    }
    return processedData
   }
}