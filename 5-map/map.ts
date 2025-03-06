class MyMap {
    buckets: Array<{ key: string, value: number }[]>;
    private bucketsSize: number;

    constructor(size: number = 7) {
        // Инициализация структуры
        this.buckets = new Array(size).fill(null).map(() => [])
        this.bucketsSize = size;
    }

    hashFunction(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i); // Суммируем коды символов ключа
        }
        // console.log(hash % this.bucketsSize)
        return hash % this.bucketsSize; // Ограничиваем хэш размером бакетов
    }



    set(key: string, value: number) {
        const index = this.hashFunction(key); // Вычисляем индекс бакета
        const bucket = this.buckets[index]; // Получаем бакет

        // Проверяем, есть ли уже такой ключ в бакете
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value = value; // Обновляем значение, если ключ уже существует
                return;
            }
        }
        bucket.push({ key, value })
        // console.log(bucket)
    }

    has(key: string): boolean {
        const index = this.hashFunction(key); // Вычисляем индекс бакета
        const bucket = this.buckets[index]; // Получаем бакет
        for (let res of bucket) {
            if (res.key == key) {
                return true;
            }
        }
        return false
    }

    delete(key: string):boolean {
        const index = this.hashFunction(key); // Вычисляем индекс бакета
        let bucket = this.buckets[index]; // Получаем бакет

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket.splice(i, 1); // Удаляем пару, если ключ найден
                return true;
            }
        }

        return false; // Ключ не найден
    }
    get(key: string) {
        const index = this.hashFunction(key); // Вычисляем индекс бакета
        let bucket = this.buckets[index]; // Получаем бакет

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                return bucket[i].value;
            }
        }

        return false; // Ключ не найден
    };

    clear(size: number = 7) {
        return this.buckets = new Array(size).fill(null).map(() => [])
    }


}

// Пример добавления данных
let weatherMap = new MyMap();
weatherMap.set('London', 20);
weatherMap.set('Valencia', 30);
weatherMap.set('Berlin', 25);

// Пример получения данных
// console.log(weatherMap.has('London')); 

// weatherMap.hashFunction('London')
// weatherMap.hashFunction('Valencia')
// weatherMap.hashFunction('Berlin')
console.log(weatherMap.buckets)
console.log(weatherMap.has('Berlin')); 
console.log(weatherMap.get('Berlin')); 
console.log(weatherMap.delete('Berlin')); 
console.log(weatherMap.buckets)