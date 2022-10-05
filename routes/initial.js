const express = require('express'); //import express
const router  = express.Router(); 

router.get("/", function (req, res) {
    res.send({'message':'use path /api/v1/addresses to get addresses new you'})
  });
module.exports = router;