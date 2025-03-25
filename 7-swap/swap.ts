const obj: Record<string, number> = {
    a: 1,
    b: 2
}

function swapKeysAndValues<T extends Record<string, number>>(obj: T): Record<number, string> {
    let list: Record<number, string> = {};    
    for (let key in obj) {
        list[obj[key]] = key;
    }
    return list
}

const res = swapKeysAndValues(obj);

console.log(res);

