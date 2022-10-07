//const createServer = require('./utility/server')
const express = require ('express');
const app = express();
app.use(express.json());

const testRouter = require('./routes/test')
const addressRouter = require('./routes/adress'); // import the routes
const indexRouter = require('./routes/initial')
const cors = require('cors')
app.use(cors());
app.use('/',testRouter)
app.use('/api/v1/', indexRouter); //to use the routes
app.use('/api/v1/addresses', addressRouter); //to use the routes

if (process.env.NODE_ENV === 'test') {
    app.listen(process.env.TEST_PORT);
}
const listener = app.listen(process.env.PORT || 4000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})


module.exports = app