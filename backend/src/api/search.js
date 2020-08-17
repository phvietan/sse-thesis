const express = require('express');
const Promise = require('bluebird');

const db = require('../db');
const ApiResult = require('../apiresult');
const { getLeftChild, getRightChild } = require('../helper');

const router = express.Router();

async function getTrapdoorsFromSubtree(i, j, t, id, kul, kur) {
    if (i < 1) return [];
    if (await db.isNodeDeleted(id, i, j)) return [];
    if (i === 1) return [{ trapdoor: t, fileId: j }];

    const { i: li, j: lj } = getLeftChild(i, j);
    const { i: ri, j: rj } = getRightChild(i, j);
    const tLeft = kur.encrypt(t);
    const tRight = kul.encrypt(t);

    const leftSubtree = await getTrapdoorsFromSubtree(li, lj, tLeft, id, kul, kur);
    const rightSubtree = await getTrapdoorsFromSubtree(ri, rj, tRight, id, kul, kur);
    return [
        ...leftSubtree,
        ...rightSubtree,
    ];
}

router.post('/', async (req, res, next) => {
    console.log("search api")
    const { query } = req.body;
    const { kul, kur } = res.locals;
    const id = res.locals.client.getId();

    const trapdoors = await Promise.reduce(query, async (acc, val) => {
        const { i, j, t } = val;
        const currentTrapdoors = await getTrapdoorsFromSubtree(i, j, t, id, kul, kur);
        acc = [ ...acc, ...currentTrapdoors ];
        return acc;
    }, []);

    const trapdoorWithHash = await Promise.map(trapdoors, async (val) => {
        return {
            ...val,
            fileHash: await db.getFileHashOfUserById(id, val.fileId),
        };
    }, { concurrency: 8 });

    try {
        let searchedResult = [];
        await db.db.transaction(async (trx) => {
            const result = await Promise.filter(trapdoorWithHash, async (t) => {
                return await db.txCheckTrapdoorExistFile(trx, t.fileHash, t.trapdoor);
            });
            searchedResult = searchedResult.concat(
                result.map(val => { return {
                    file_id: val.fileId,
                    file_hash: val.fileHash,
                };})
            );
        });
        const result = new ApiResult(searchedResult);
        next(result);
    } catch (e) {
        const result = new ApiResult([], `Cannot search: ${e.message}`, 500);
        next(result);
    }
});

module.exports = router;