class ApiResult {
    constructor(result = {}, errorMessage = "", statusCode = 200) {
        this.result = result;
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }

    getResult() { return this.result; }
    getStatusCode() { return this.statusCode; }
    getErrorMessage() { return this.errorMessage; }
    toJson() {
        return {
            result: this.result,
            status: this.statusCode,
            error: this.errorMessage,
        }
    }
}

module.exports = ApiResult;