const data = require('./../resources/data.json')
const { findDistance } = require('./../utility/FindDistance')

const retrieveOffices = (req, res, next) => {
    console.log(req.body);
    console.log(typeof req.body);
    const { latitude, longitude, range } = req.body.request
    const response = calculateDistanceWithInRange(parseFloat(latitude), parseFloat(longitude), parseFloat(range))
    res.send(response);
};

const fetchAllOffices = (req, res,) => {
    const response = transformResponse(req)  
    res.send(response)  
}
const calculateDistanceWithInRange = ((lat, long, range) => {
    let request = {
        latitude1: lat,
        longitude1: long,
        latitude2: '',
        longitude2: '',
        range: range
    }
    console.log('Request is', request);

    const response = transformResponse(request);
    //console.log(response);
    let filteredResponse = response.filter((obj) => {
        return obj.address.distance <= range
    })
    filteredResponse = filteredResponse.sort((a,b) => a.address.distance - b.address.distance)
    console.log('filteredResponse', JSON.stringify(filteredResponse));
    return filteredResponse;
})

function flattenResponse(response = []) {
    const modifiedResponse = []
    response.map((obj) => {
        let { addresses, ...rest } = obj
        if (addresses && addresses.length == 1) {
            let newObj = { ...rest, address: addresses[0] }
            modifiedResponse.push(newObj)
        } else if (addresses && addresses.length > 1) {
            addresses.forEach((ad) => {
                let newObj = { ...rest, address: ad }
                modifiedResponse.push(newObj)
            })
        }
    })
    return modifiedResponse
}

function transformResponse(request) {
    let response = []
    data.map((org) => {
        let resData = initResponse();
        resData.organization = org.organization;
        resData.website = org.website;
        resData.services = org.services;
        resData.natureOfWork = org.willWorkRemotely ? 'Currently working from office' : 'Currently working remote';
        org.offices.map((off) => {
            [request.latitude2, request.longitude2] = off.coordinates.split(',').map(parseFloat);
            let offAddress = {};
            if(request.latitude1){
                let calDistance = findDistance(request);
                offAddress.distance = calDistance;
            }
            offAddress.latitude = request.latitude2
            offAddress.longitude = request.longitude2
            offAddress.location = off.address;
            offAddress.city = off.location;
            resData.addresses.push(offAddress);
        })
        response.push(resData);
    });

    const flatResponse = flattenResponse(response);
    return flatResponse;
}

initAddress = () => {
    return {
        city: '',
        location: '',
        distance: ''
    }
}


initResponse = () => {
    return {
        organization: '',
        natureOfWork: '',
        addresses: [],

    }
}

module.exports = { retrieveOffices, fetchAllOffices };