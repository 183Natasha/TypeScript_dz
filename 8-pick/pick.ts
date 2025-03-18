interface IUser {
    name?: string,
    age?: number,
    skills?: string[]
}


const user ={
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript']
}

type KeyOfUser = keyof typeof user;

function pickObjectCase (user: IUser, Keys : KeyOfUser[]) :  Partial <IUser>{
    const result: Partial <IUser>= {}
    for (const key of Keys){
        if (user[key] !== undefined){
            result[key] = user[key]
        }
    }
    return result
}

const res = pickObjectCase(user, ['age', 'skills'])
console.log(res)