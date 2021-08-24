const base64 = require("base-64");
const pkgConfig = require("./package.json");
const vaultEndpoint = "https://vault.omise.co/";
const apiEndpoint = "https://api.omise.co/";

let _key;
let _apiVersion;
class ReactNativeOmise {
    constructor() {
        this.createSource = this.createSource.bind(this);
        this.createToken = this.createToken.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.retrieveCustomer = this.retrieveCustomer.bind(this)
    }

    config(key, apiVersion = "2015-11-17") {
        _key = key
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
        const headers = this.getHeaders(_key)
        return new Promise((resolve, reject) => {
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
        const headers = this.getHeaders(_key)
        return new Promise((resolve, reject) => {
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

    createCustomer(data) {
        const customerEndpoint = apiEndpoint + "customers";
        const headers = this.getHeaders(_key)
        return new Promise((resolve, reject) => {
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

    retrieveCustomer(customerId) {
        const customerEndpoint = apiEndpoint + "customers/" + customerId
        const headers = this.getHeaders(_key)
        return new Promise((resolve, reject) => {
            return fetch(customerEndpoint, {
                method: 'GET',
                cache: 'no-cache',
                headers: headers
            }).then((response) => {
                if (response.ok && response.status === 200) {
                    resolve(response.json());
                } else {
                    console.log("response not ok", response);
                    reject(response.json());
                }
            }).catch((error) => resolve(error));
        })
    }
}


const reactNativeOmise = new ReactNativeOmise();

module.exports = {
    config: reactNativeOmise.config,
    createToken: reactNativeOmise.createToken,
    createSource: reactNativeOmise.createSource,
    createCustomer: reactNativeOmise.createCustomer,
    retrieveCustomer: reactNativeOmise.retrieveCustomer
}