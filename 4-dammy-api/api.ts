import axios from 'axios';

axios.get<IResponseFormat>('https://dummyjson.com/users')
    .then(response => {
        const informationOfUsers = response.data;
        console.log(informationOfUsers)
    })
    .catch(error => {
        console.error('Ошибка при запросе:', error);
    });

interface IResponseFormat {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: Gender,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: BloodGroup,
    height: number,
    weight: number,
    eyeColor: EyeColor,
    hair: Hair,
    ip: string,
    address: Address,
    macAddress: string,
    university: string,
    bank: Bank,
    company: Company,
    ein: string,
    ssn: string,
    userAgent:string, 
    crypto: Crypto,
    role: Role
}

interface Hair{
    color: HairColor,
    type: HairType
}

interface Address{
    addres: string,
    city: string,
    state: string,
    stateCode: string,
    postalCode: string,
    coordinates: Coordinates, 
    country: string
}

interface Coordinates{
    lat: number,
    lng: number
}

interface Bank{
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company{
    department: string;
    name: string;
    title: string;
    address: string[]
}

interface Crypto{
    coin: string,
    wallet: string,
    network: string
}


enum Gender{
    male = 'male',
    female = 'female'
}

enum BloodGroup{
    OPlus= 'O+' ,
    OMinus= 'O-',
    APlus= 'A+' ,
    AMinus= 'A-',
    BPlus= 'B+' ,
    BMinus= 'B-',
    ABPlus= 'AB+' ,
    ABMinus= 'AB-'    
}

enum EyeColor{
    green= 'Green',
    red= 'Red',
    hazel ='Hazel',
    amber = 'Amber',
    blue = 'Blue',
    brown = 'Brown',
    violet = 'Violet'
}

enum HairColor{
    Brown = 'Brown',
    Green = 'Green',
    Blonde = 'Blonde',
    White ='White',
    Gray ='Gray',
    Red = 'Red',
    Purple = 'Purple',
    Blue = 'Blue',
    Blac ='Blac'
}

enum HairType{
    Straight = 'Straight',
    Kinky = 'Kinky',
    Curly = 'Curly',
    Wavy = 'Wavy',
}

enum Role{
    admin = 'admin',
    moderator = 'moderator',
    user = 'user'
}


