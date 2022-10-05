const express = require('express'); //import express
const router  = express.Router(); 
const {retrieveOffices,fetchAllOffices} = require('../controller/AddressController'); 

router.post('/', retrieveOffices); 
router.get('/', fetchAllOffices)
module.exports = router; // export to use in server.js
