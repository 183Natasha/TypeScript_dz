"use strict";
class RequestBuilder {
    constructor() {
        this.method = "GET";
        this.url = "";
        this.headers = {}; //{ [key: string]: string }.
    }
    setMethod(method) {
        this.method = method;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    setHeaders(headers = {}) {
        this.headers = headers;
        return this;
    }
    async execute() {
        return fetch(this.url, { method: this.method, headers: this.headers });
    }
}
const request = new RequestBuilder()
    .setMethod('GET')
    .setURL("https://183natasha.github.io/my_first_progect/")
    .setHeaders({ "Accept": "application/json" })
    .execute()
    .then(response => console.log(response));
