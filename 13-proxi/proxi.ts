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

interface IProduct{
    id: number,
    title: string,
    price: number
}
interface IProductAPI{
    getProduct(id: number) : Promise<IProduct> 
}


class ProductAPI implements IProductAPI {
    async getProduct(id: number): Promise<IProduct> {
        const response = await new RequestBuilder()
            .setMethod('GET')
            .setURL(`https://dummyjson.com/products/${id}`)
            .setHeaders({"Accept": "application/json"})
            .execute();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json() as Promise<IProduct>;
    }
}

class ProductAccessProxy implements IProductAPI {
    constructor(private api: IProductAPI) {}
    
    async getProduct(id: number): Promise<IProduct> {
        if (id > 10) {
            console.log(`Попытка получения некорректных данных: ID продукта больше 10`);
            throw new Error(`Некорректный id`);
        }
        const product = await this.api.getProduct(id);
            console.log(`Информациия о продукте с данным id: ${id}`, product);
            return product;
    }
}


async function getAndDisplayProduct(id: number) {
    const proxy = new ProductAccessProxy(new ProductAPI());
    
    try {
        const product = await proxy.getProduct(id);
        console.log(`Продукт: ${product.title} - Цена: ${product.price}`);
        return product;
    } catch (error) {
        console.error("Ошибка запроса");
    }
}

(async () => {
    await getAndDisplayProduct(1);   
    await getAndDisplayProduct(15);    
})();