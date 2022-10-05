const { getDistance } = require('geolib')

const findDistance  = ({latitude1,latitude2,longitude1,longitude2}) => {
    const distance = getDistance({latitude:latitude1, longitude:longitude1}, {latitude:latitude2,
     longitude:longitude2})
     const result = parseFloat(distance/1000).toPrecision(3)
     return parseFloat(result)
}

module.exports = {findDistance}