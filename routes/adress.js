const express = require('express'); //import express
const adressRouter  = express.Router(); 
const {retrieveOffices,fetchAllOffices} = require('../controller/AddressController'); 

adressRouter.post('/', retrieveOffices); 
adressRouter.get('/', fetchAllOffices)
module.exports = adressRouter; // export to use in server.js
