const myDict = {
    51: 'AL', 1: 'AK', 81: 'AZ', 71: 'AR', 91: 'CA', 82: 'CO', 11: 'CT', 31: 'DE', 32: 'DC', 33: 'FL',
    34: 'GA', 2: 'HI', 83: 'ID', 41: 'IL', 42: 'IN', 61: 'IA', 62: 'KS', 52: 'KY', 72: 'LA', 12: 'ME', 35: 'MD', 13: 'MA',
    43: 'MI', 63: 'MN', 53: 'MS', 64: 'MO', 84: 'MT', 65: 'NE', 85: 'NV', 14: 'NH', 21: 'NJ', 86: 'NM', 22: 'NY', 36: 'NC',
    66: 'ND', 44: 'OH', 73: 'OK', 92: 'OR', 23: 'PA', 15: 'RI', 37: 'SC', 67: 'SD', 54: 'TN', 74: 'TX', 87: 'UT', 16: 'VT',
    38: 'VA', 93: 'WA', 39: 'WV', 45: 'WI', 88: 'WY', 3: 'PR', 4: 'VI', 5: 'PC'
}

const myPromise = (data, attribute) => {
    return new Promise((resolve, reject) => {

        for (var i = 0; i < data.length; i++) {
            console.log(data[i])
            data[i].dataValues[attribute] = myDict[data[i].dataValues[attribute]]

        }


        resolve(data)
    })
}

module.exports = myPromise