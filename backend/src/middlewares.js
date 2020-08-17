const Client = require('./client');
const RsaHandler = require('./rsa');
const ApiResult = require('./apiresult');

function filterNonString(req, res, next) {
    const variables = Object.keys(req.query);
    const check = variables.reduce((acc, cur) => acc && helper.isString(req.query[cur]), true);
    if (!check) {
        const res = new ApiResult('', "Hack detected", 500);
        res.json(res.toJson());
        return;
    }
    next();
}

function createClientObject(req, res, next) {
    const { ul, ur } = req.body;
    res.locals.client = new Client({ ul, ur });
    const kul = new RsaHandler(ul.n, ul.e);
    const kur = new RsaHandler(ur.n, ur.e);
    res.locals.kul = kul;
    res.locals.kur = kur;
    next();
}

function handleNoneEndpoints(result, _, _, next) {
    console.log("Handle none endpoint");
    if (!result) {
        result = new ApiResult('', 'No such api', 404);
    }
    next(result);
}

function handleResult(result, req, res, next) {
    console.log("Handle result");
    if (result.getStatusCode() !== 200) {
        console.log(`[Error] Status code = ${result.getStatusCode()}`);
        console.log(`[Error] Message = ${result.getErrorMessage()}`);
    }
    return res.json(result.toJson());
}

module.exports = {
    filterNonString,
    createClientObject,
    handleNoneEndpoints,
    handleResult,
}