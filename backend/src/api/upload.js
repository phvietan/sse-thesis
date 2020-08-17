const fs = require('fs');
const path = require('path');
const express = require('express');
const Promise = require('bluebird');

const db = require('../db');
const helper = require('../helper');
const ApiResult = require('../apiresult');

const router = express.Router();
router.post('/', async (req, res, next) => {
    const { EF, I } = req.body;
    try {
        const userHash = res.locals.client.getId();
        await db.db.transaction(async (trx) => {
            const n = 1 + (await db.getNumberOfFilesFromUser(userHash));
            const fileHash = helper.calculateFileHash(userHash, n);

            // Store db then Write file EF
            await db.storeEF(trx, userHash, fileHash, n);
            const fileLocation = path.join(__uploadDir, fileHash);
            fs.writeFileSync(fileLocation, EF);

            // Store I
            await Promise.map(I.split(' '), async (trapdoor) => {
                db.storeTrapdoor(trx, fileHash, trapdoor);
            }, { concurrency: 8 });
        });
        const result = new ApiResult('Done upload');
        next(result);
    } catch (e) {
        const result = new ApiResult('', `Cannot insert to database: ${e.message}`, 500);
        next(result);
    }
});

module.exports = router;
