const base64 = require("base-64");
const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

let _publicKey;
let _secretKey;
let _apiVersion;
class ReactNativeOmise {
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
        this.createCustomer = this.createCustomer.bing(this);
    }

    config(publicKey, secretKey, apiVersion = "2015-11-17") {
        _publicKey = publicKey;
        _secretKey = secretKey;
        _apiVersion = apiVersion;
    }

    getHeaders(key) {
        let headers = {
            'Authorization': 'Basic ' + base64.encode(key + ":"),
            'User-Agent': pkgConfig.name + "/" + pkgConfig.version,
            'Content-Type': 'application/json',
        };

        if (_apiVersion && _apiVersion !== "") {
            headers['Omise-Version'] = _apiVersion;
        }

        return headers;
    }

    createToken(data) {
        const tokenEndpoint = vaultEndpoint + "tokens";
        // set headers
        let headers = this.getHeaders(_publicKey);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(tokenEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    createSource(data) {
        const sourceEndpoint = apiEndpoint + "sources";
        // set headers
        let headers = this.getHeaders(_publicKey);

        return new Promise((resolve, reject) => {
            // verify a public key
            if (!_publicKey || _publicKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(sourceEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }

    createOmiseCustomer(data) {
        const customerEndpoint = apiEndpoint + "customers";
        // set headers
        let headers = this.getHeaders(_secretKey)

        return new Promise((resolve, reject) => {
            // verify a secret key
            if (!_secretKey || _secretKey === "") {
                reject("Please config your public key");
                return;
            }

            return fetch(customerEndpoint, {
                method: 'POST',
                cache: 'no-cache',
                headers: headers,
                body: JSON.stringify(data)
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        });
    }
}


const reactNativeOmise = new ReactNativeOmise();

module.exports = {
    config: reactNativeOmise.config,
    createToken: reactNativeOmise.createToken,
    createSource: reactNativeOmise.createSource,
    createCustomer: reactNativeOmise.createOmiseCustomer
}