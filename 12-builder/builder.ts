class RequestBuilder{
    private method: "GET" | "POST" = "GET";
    private url: string= "";
    private headers: Record<string, string> = {} //{ [key: string]: string }.

    setMethod(method: "GET"|"POST"):this{
        this.method = method;
        return this
    }

    setURL(url: string):this{
        this.url = url;
        return this
    }

    setHeaders(headers: Record<string, string> = {}):this{
        this.headers = headers;
        return this
    }

    async execute(): Promise<Response> {
        return fetch(this.url, { method: this.method, headers: this.headers});
    }
}

const request = new RequestBuilder()
    .setMethod('GET')
    .setURL("https://183natasha.github.io/my_first_progect/")
    .setHeaders()
    .execute()
    .then(response => console.log(response));



