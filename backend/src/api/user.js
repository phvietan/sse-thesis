const db = require('../db');

const express = require('express');
const ApiResult = require('../apiresult');
const router = express.Router();

router.post('/', async (req, res, next) => {
    console.log("user api")

    const id = res.locals.client.getId();
    const filesId = await db.getFilesFromUser(id);
    const result = new ApiResult(filesId);

    console.log("Done user api");
    next(result);
});

module.exports = router;