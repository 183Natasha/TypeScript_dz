interface IA{
    a:number;
    b: string
}

interface IB{
    a:number;
    c: boolean
}

let a: IA= {
    a: 5,
    b: ''
}

let b: IB = {
    a: 10,
    c: true
}

type ExcludedKeys<T, U> =  Exclude<keyof T, keyof U>

function difference<T extends object, U extends object>(obj1: T, obj2: U): Pick<T, ExcludedKeys<T, U>> {
    const res = {} as Pick<T, ExcludedKeys<T, U>>;

    for (let key in obj1) {
        if (!(key in obj2)) {
            res[key as ExcludedKeys<T, U>] = obj1[key as keyof T];
        }
    }
    return res;
}


let v0 = difference(a,b)
console.log(v0)
