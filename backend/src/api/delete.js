const fs = require('fs');
const path = require('path');
const express = require('express');

const db = require('../db');
const helper = require('../helper');
const ApiResult = require('../apiresult');

const router = express.Router();

async function deleteNode(trx, id, i, j) {
    await db.deleteNode(trx, id, i, j);
    const { px, py } = helper.getParent(i, j);

    const { i: li, j: lj } = helper.getLeftChild(px, py);
    const { i: ri, j: rj } = helper.getRightChild(px, py);
    const leftDel = await db.txIsNodeDeleted(trx, id, li, lj);
    const rightDel = await db.txIsNodeDeleted(trx, id, ri, rj);

    if (leftDel && rightDel) await deleteNode(trx, id, px, py);
}

router.post('/', async (req, res, next) => {
    console.log("delete api")
    const file_id = parseInt(req.body.file_id);
    const id = res.locals.client.getId();
    const n = await db.getNumberOfFilesFromUser(id);

    console.log(file_id);

    if (file_id <= 0 || file_id > n) {
        const result = new ApiResult('', 'File id is wrong', 400);
        next(result);
    } else {
        try {
            const isDel = await db.isNodeDeleted(id, 1, file_id);
            if (isDel) {
                const result = new ApiResult('Already deleted');
                next(result);
            } else {
                await db.db.transaction(async (trx) => {
                    // Cache as deleted then delete real file
                    await deleteNode(trx, id, 1, file_id);
                    const fileHash = await db.txGetFileHashOfUserById(trx, id, file_id);
                    const fileLocation = path.join(__uploadDir, fileHash);
                    fs.unlinkSync(fileLocation);

                    // Delete file in database
                    await db.txDeleteFile(trx, id, fileHash);
                });
                const result = new ApiResult('Delete success');
                next(result);
            }
        } catch (e) {
            const result = new ApiResult('', `Cannot delete file ${file_id}: ${e.message}`, 500);
            next(result);
        }
    }
});

module.exports = router;