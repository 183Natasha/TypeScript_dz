class User {
    @AllowFunc((a: number) => a > 0)
    age: number = 30
}

function AllowFunc(check:(num:number) => boolean) :any{
    return function <This>(
        target: Object,
        context: ClassFieldDecoratorContext<This, number>
    ) {
        return function(this: This, value: number): number{
            if (!check(value)) {
                throw new Error(`Значение ${value} меньше нуля!`);
            }
            let age=value;
            return age;
        }
    }
} 



const person = new User();
console.log(person.age)

person.age = 0;
console.log(person.age)

person.age = 20;
console.log(person.age)

