const db = require('../db');

const express = require('express');
const ApiResult = require('../apiresult');
const router = express.Router();

router.post('/', async (req, _, next) => {
    const { EF, I } = req.body;
    const userHash = res.locals.client.getId();

    try {
        const trxResult = await db.db.transaction(async (trx) => {
            const n = db.getNumberOfFilesFromUser(userHash);
            const fileHash = 
            db.storeEF()
        });
        console.log("transaction was committed");
      } catch (e) {
        console.log("transaction was rolled back");
      }

    db.transaction
    console.log(EF);
    console.log(I);

    // const { EF, I } = await db.getFilesFromUser(id);
    // const result = new ApiResult('');
    next();
});

module.exports = router;
