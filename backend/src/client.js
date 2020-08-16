const helper = require('./helper');

const defaultObj = {
    n: "1",
    e: "0",
};

class Client {
    constructor(obj) {
        this.ul = obj.ul || defaultObj;
        this.ur = obj.ur || defaultObj;
        this.id = helper.calculateHash({
            ul: this.ul,
            ur: this.ur,
        });
    }

    getUL() { return this.ul; }
    getUR() { return this.ul; }
    getId() { return this.id; }
};

module.exports = Client;