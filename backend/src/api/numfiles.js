const db = require('../db');

const express = require('express');
const ApiResult = require('../apiresult');
const router = express.Router();

router.post('/', async (req, res, next) => {
    console.log("number of files api")

    const id = res.locals.client.getId();
    const files = await db.getFilesFromUser(id);
    const result = new ApiResult(files);

    console.log("Done user api");
    next(result);
});

module.exports = router;