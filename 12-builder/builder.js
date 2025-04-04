"use strict";
// class MyRequest{
//     constructor(
//         private method: "GET" | "POST",
//         private url: string,
//         private headers: string
//     ){}
// }
class RequestBuilder {
    constructor() {
        this.method = "GET";
        this.url = "";
        this.headers = {};
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
    // build():MyRequest{
    //     return new MyRequest(
    //     this.method, this.url, this.headers
    // )
    // }
    async execute() {
        return fetch(this.url, { method: this.method, headers: this.headers });
    }
}
const request = new RequestBuilder()
    .setMethod('GET')
    .setURL("https://183natasha.github.io/my_first_progect/")
    .setHeaders()
    .execute()
    .then(response => console.log(response));
