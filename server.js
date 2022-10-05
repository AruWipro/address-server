const express = require ('express');
const addressRouter = require('./routes/adress'); // import the routes
const indexRouter = require('./routes/initial')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/', indexRouter); //to use the routes
app.use('/api/v1/addresses', addressRouter); //to use the routes

const listener = app.listen(process.env.PORT || 4000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
