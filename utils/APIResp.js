module.exports = {

    getExistsResult: function (result, res) {
        res.status(202).send({ "status": false, responsecode: 202, message: result });
    },
    getSuccessResult: function (result, msg, res) {
        let jsonMsg = { "status": true, responsecode: 200, message: msg, data: result };
        res.status(200).send(jsonMsg);
    },
    // getNoResult: function (resp, res) {
    // 	res.status(201).send({ "status": true,responsecode:200, message: resp });
    // },
    getMessageResult: function (response, msg, res) {
        res.status(200).send({ "status": true, responsecode: 200, data: response, message: msg });
    },
    getNotExistsResult: function (response, res) {
        res.status(204).send({ "status": false, responsecode: 204, message: response });
    },
    getBadRequestResult: function (result, res) {
        res.status(400).send({ "status": false, responsecode: 400, message: 'Bad request found' });
    },
    getAlreadyExistsResult: function (result, res) {
        res.status(409).send({ "status": false, responsecode: 409, message: result });
    },
    getValidationResult: function (errResp, res) {
        res.status(500).send({ "status": false, message: errResp });
    },
    getINTERNALSERVERError: function (result, res) {
        res.status(500).send({ "status": false, responsecode: 500, message: result });
    },
    getErrorResult: function (errResp, res) {
        res.status(400).send({ "status": false, responsecode: 400, message: errResp });
    },
    getValidationResult: function (errResp, res) {
        res.status(500).send({ "status": false, message: errResp });
    },
    getUpdateResult: function (resp, res) {
        res.status(201).send({ "status": true, responsecode: 201, message: resp });
    },
    getUpdateResultList: function (resp, msg, res) {
        res.status(201).send({ "status": true, responsecode: 201, message: msg, data: resp});
    },
    getCreatedResult: function (msg, resp, res) {
        res.status(201).send({ "status": true, responsecode: 201, message: msg, data: resp });
    },
    getDeletedResult: function (resp, res) {
        res.status(200).send({ "status": true, responsecode: 200, message: resp });
    },
    getCreatedMsgResult: function (result, msg, res) {
        let jsonMsg = { "status": true, responsecode: 200, result, message: msg };
        res.status(200).send(jsonMsg);
    },
    getAccessResult: function(token,msg,res){
     res.status(200).send({ "status": true, responsecode: 200,accessToken: token, message:msg })
    },
    getAcceptedResult: function (msg, res, result) {
        let jsonMsg = { "status": true, responsecode: 200, message: msg, data: result };
        res.status(200).send(jsonMsg);
    },
    getUniquenessError: function (result, res) {
        res.status(500).send({ "status": false, message: result });
    },
    getUniquenessCheck: function (result, msg, res) {
        res.status(409).send({ message: result, name: msg });
    },
    getUniqueCheck: function (result, res) {
        res.status(200).send({ message: result });
    },
    getSuccessResultsonly: function (result, message, res) {
        let jsonMsg = { "status": true, message, responsecode: 200, data: { "Result": true } };
        res.status(200).send(jsonMsg);
    },
    getSuccessResults: function (result, message, res) {
        let jsonMsg = { "status": true, responsecode: 200, data: result, message };
        res.status(200).send(jsonMsg);
    },
    getSuccessResultsV2: function (result, summary, res) {
        const { pages } = summary
        const summaryData = pages ? { totalsize: pages.total_count, resultsize: pages.limit, filteredsize: pages.count, page: pages.pageno } : null
        let jsonMsg = { result, summary: summaryData };
        res.status(200).send(jsonMsg);
    },
}