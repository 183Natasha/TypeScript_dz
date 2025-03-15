class ListNode {
    constructor(
        public key: string,
        public value: number,
        public next: ListNode | null = null,
    ) { }
}


class MyMap {
    buckets: Array<ListNode | null>;
    private bucketsSize: number;

    constructor(size: number = 7) {
        this.buckets = new Array(size).fill(null)
        this.bucketsSize = size;
    }

    hashFunction(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.bucketsSize;
    }



    set(key: string, value: number): void {
        const index = this.hashFunction(key);
        let currentNode = this.buckets[index];

        if (currentNode == null) {
            this.buckets[index] = new ListNode(key, value);
            return
        }

        while (currentNode) {
            if (currentNode.key == key) {
                currentNode.value = value;
                return
            }
            if (!currentNode.next) break
            currentNode = currentNode.next;
        }
        currentNode.next = new ListNode(key, value);
    }

    has(key: string): boolean {
        const index = this.hashFunction(key);
        let currentNode = this.buckets[index];

        while (currentNode) {
            if (currentNode.key == key) {
                return true
            }
            currentNode = currentNode.next
        }
        return false
    }

    delete(key: string): boolean {
        const index = this.hashFunction(key);
        let currentNode = this.buckets[index];
        let previousNode: ListNode | null = null;

        while (currentNode) {
            if (currentNode.key === key) {
                if (previousNode) {
                    previousNode.next = currentNode.next;
                } else {
                    this.buckets[index] = currentNode.next;
                }
                return true; 
            }
            previousNode = currentNode;
            currentNode = currentNode.next;

        }
        return false
    }

    get(key: string) {
        const index = this.hashFunction(key); 
        let currentNode = this.buckets[index]; 

        while (currentNode) {
            if (currentNode.key === key) {
                return currentNode.value;
            }
            currentNode = currentNode.next
        }
        return false; 
    };

    clear(size: number = 7) {
        return this.buckets = new Array(size).fill(null)
    }


}

// Пример добавления данных
let weatherMap = new MyMap();
weatherMap.set('London', 20);
weatherMap.set('Valencia', 30);
weatherMap.set('Berlin', 25);
weatherMap.set('Lndnoo', -15);

// Пример получения данных
console.log(weatherMap.has('London')); 

weatherMap.hashFunction('London')
weatherMap.hashFunction('Valencia')
weatherMap.hashFunction('Berlin')
console.log(weatherMap.buckets[2])
// weatherMap.clear()
console.log(weatherMap.has('Lndnoo'));
console.log(weatherMap.get('Valencia'));
console.log(weatherMap.delete('Berlin'));
console.log(weatherMap.buckets)