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

	public sortById() {
		this.tasks = this.tasks.sort((a, b) => {
			if (a.id > b.id) {
				return 1;
			} else if (a.id == b.id) {
				return 0;
			} else {
				return -1;
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
		return new PriorityTaskItearator(this);
	}

    public getIteratorId() {
		return new idTaskItearator(this);
	}
}

interface IIterator<T> {
	current(): T | undefined;
	next(): T | undefined;
	prev(): T | undefined;
	index(): number;
}

class PriorityTaskItearator implements IIterator<Task> {
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

class idTaskItearator implements IIterator<Task> {
	private position: number = 0;
	private taskList: TaskList;

	constructor(taskList: TaskList) {
		taskList.sortById();
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
taskList.addTask(new Task(8, 1, '01-01-2023', 'Тест'));
taskList.addTask(new Task(1, 2, '01-01-2023', 'Тест'));
taskList.addTask(new Task(3, 3, '01-01-2023', 'Тест'));
const iterator = taskList.getIteratorPriority();
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())


const iterator2 = taskList.getIteratorId();
console.log(iterator.current())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.prev())
console.log(iterator.index())