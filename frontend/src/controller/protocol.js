const { getPublicKeys } = require('./controller_storage');

// Call to backend server (body does not need rsa keys)
// This function automatically append rsa pub keys
async function request(method, path, body = {}) {
    if (!body.ul || !body.ur) {
        const clientObj = getPublicKeys();
        body = {
            ...body,
            ...clientObj,
        };
    }
    try {
        const url = `http://192.168.192.129:8000${path}`;
        const response = await fetch(url, { 
            method, 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        return response.json();
    } catch (err) {
        return {
            status: 408,
            result: {},
            error: `Fetch api error: ${err.message}`, 
        };
    }
}

async function requestFiles() {
    return request("POST", "/api/user")
}

async function uploadFile(body) {
    return request("POST", "/api/upload", body)
}

async function requestSearch(body) {
    return request("POST", "/api/search", body)
}

module.exports = {
    requestFiles,
    uploadFile,
    requestSearch,
};