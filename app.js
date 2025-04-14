    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const api = require('./api')
    const cors = require("cors");

    require('dotenv').config();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })



    app.use('/', api);