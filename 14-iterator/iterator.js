"use strict";
class Task {
    constructor(priority, id, date, title) {
        this.priority = priority;
        this.id = id;
        this.date = date;
        this.title = title;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
    }
    sortById(order = "up") {
        this.tasks = this.tasks.sort((a, b) => {
            if (order == 'up') {
                return a.id - b.id;
            }
            else {
                return b.id - a.id;
            }
        });
    }
    sortByDate(order = "up") {
        this.tasks = this.tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (order == 'up') {
                return dateA.getTime() - dateB.getTime();
            }
            else {
                return dateB.getTime() - dateA.getTime();
            }
        });
    }
    sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if (a.priority > b.priority) {
                return 1;
            }
            else if (a.priority == b.priority) {
                return 0;
            }
            else {
                return -1;
            }
        });
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return this.tasks;
    }
    count() {
        return this.tasks.length;
    }
    getIteratorPriority() {
        return new PriorityTaskIterator(this);
    }
    getIteratorId(order = "up") {
        return new idTaskIterator(this, order);
    }
    getIteratorDate(order = "up") {
        return new dateTaskIterator(this, order);
    }
}
class PriorityTaskIterator {
    constructor(taskList) {
        this.position = 0;
        taskList.sortByPriority();
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
}
class dateTaskIterator {
    constructor(taskList, order = "up") {
        this.order = order;
        this.position = 0;
        taskList.sortByDate(this.order);
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
}
class idTaskIterator {
    constructor(taskList, order = "up") {
        this.order = order;
        this.position = 0;
        taskList.sortById(this.order);
        this.taskList = taskList;
    }
    current() {
        return this.taskList.getTasks()[this.position];
    }
    next() {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }
    prev() {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
    index() {
        return this.position;
    }
}
const taskList = new TaskList();
taskList.addTask(new Task(8, 1, '01-01-2025', 'Тест1'));
taskList.addTask(new Task(1, 2, '01-01-2026', 'Тест2'));
taskList.addTask(new Task(3, 3, '01-01-2023', 'Тест3'));
console.log('Сортировка по приоритету');
const iterator = taskList.getIteratorPriority();
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
console.log('Сортировка по возрастанию id');
const iterator2 = taskList.getIteratorId('up');
console.log(iterator2.current());
console.log(iterator2.next());
console.log(iterator2.next());
console.log(iterator2.prev());
console.log(iterator2.index());
console.log('Сортировка по убыванию id');
const iterator3 = taskList.getIteratorId('down');
console.log(iterator3.current());
console.log(iterator3.next());
console.log(iterator3.next());
console.log(iterator3.prev());
console.log(iterator3.index());
console.log('Сортировка по убыванию даты');
const iterator4 = taskList.getIteratorDate('down');
console.log(iterator4.current());
console.log(iterator4.next());
console.log(iterator4.next());
console.log(iterator4.prev());
console.log(iterator4.index());
console.log('Сортировка по возрастанию даты');
const iterator5 = taskList.getIteratorDate('up');
console.log(iterator5.current());
console.log(iterator5.next());
console.log(iterator5.next());
console.log(iterator5.prev());
console.log(iterator5.index());
