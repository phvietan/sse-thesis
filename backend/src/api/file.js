const fs = require('fs');
const path = require('path');
const express = require('express');

const db = require('../db');
const ApiResult = require('../apiresult');

const router = express.Router();

router.post('/', async (req, res, next) => {
    console.log("file api")
    const { fileHash } = req.body;
    const id = res.locals.client.getId();
    if (await db.checkIsFileOfUser(id, fileHash)) {
        const fileLocation = path.join(__uploadDir, fileHash);
        const content = fs.readFileSync(fileLocation).toString('utf8');
        const result = new ApiResult(content);
        next(result);
    }
    console.log("Not owner");
    const result = new ApiResult('', 'Not permitted', 403);
    next(result);
});

module.exports = router;