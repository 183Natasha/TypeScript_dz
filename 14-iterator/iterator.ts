class Task {
    constructor(
        public priority: number,
        public id: number,
        public date: string,
        public title: string,
    ) { }
}

class TaskList {
    private tasks: Task[] = [];

    public sortById(order: "up" | "down" = "up") {
        this.tasks = this.tasks.sort((a, b) => {
            if (order == 'up') {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        })
    }

    public sortByDate(order: "up" | "down" = "up") {
        this.tasks = this.tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            if (order == 'up') {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        })        
    }


    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if (a.priority > b.priority) {
                return 1;
            } else if (a.priority == b.priority) {
                return 0;
            } else {
                return -1;
            }
        })
    }

    public addTask(task: Task) {
        this.tasks.push(task);
    }

    public getTasks() {
        return this.tasks;
    }

    public count() {
        return this.tasks.length;
    }

    public getIteratorPriority() {
        return new PriorityTaskIterator(this);
    }

    public getIteratorId(order: "up" | "down" = "up") {
        return new idTaskIterator(this, order);
    }

    public getIteratorDate(order: "up" | "down" = "up") {
        return new dateTaskIterator(this, order);
    }
}

interface IIterator<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;

}

class PriorityTaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList) {
        taskList.sortByPriority();
        this.taskList = taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev(): Task | undefined {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index(): number {
        return this.position;
    }
}

class dateTaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList, private order: "up" | "down" = "up") {
        taskList.sortByDate(this.order);
        this.taskList = taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev(): Task | undefined {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index(): number {
        return this.position;
    }
}

class idTaskIterator implements IIterator<Task> {
    private position: number = 0;
    private taskList: TaskList;

    constructor(taskList: TaskList, private order: "up" | "down" = "up") {
        taskList.sortById(this.order);
        this.taskList = taskList;
    }

    current(): Task | undefined {
        return this.taskList.getTasks()[this.position];
    }
    next(): Task | undefined {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev(): Task | undefined {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index(): number {
        return this.position;
    }
}

const taskList = new TaskList();
taskList.addTask(new Task(8, 1, '01-01-2025', 'Тест1'));
taskList.addTask(new Task(1, 2, '01-01-2026', 'Тест2'));
taskList.addTask(new Task(3, 3, '01-01-2023', 'Тест3'));

console.log('Сортировка по приоритету')
const iterator = taskList.getIteratorPriority();
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())

console.log('Сортировка по возрастанию id')
const iterator2 = taskList.getIteratorId('up');
console.log(iterator2.current())
console.log(iterator2.next())
console.log(iterator2.next())
console.log(iterator2.prev())
console.log(iterator2.index())

console.log('Сортировка по убыванию id')
const iterator3 = taskList.getIteratorId('down');
console.log(iterator3.current())
console.log(iterator3.next())
console.log(iterator3.next())
console.log(iterator3.prev())
console.log(iterator3.index())

console.log('Сортировка по убыванию даты')
const iterator4 = taskList.getIteratorDate('down');
console.log(iterator4.current())
console.log(iterator4.next())
console.log(iterator4.next())
console.log(iterator4.prev())
console.log(iterator4.index())

console.log('Сортировка по возрастанию даты')
const iterator5 = taskList.getIteratorDate('up');
console.log(iterator5.current())
console.log(iterator5.next())
console.log(iterator5.next())
console.log(iterator5.prev())
console.log(iterator5.index())