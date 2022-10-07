function createServer() {
    const express = require ('express');
    const app = express();
    app.use(express.json());

    return app;
}

module.exports =createServer