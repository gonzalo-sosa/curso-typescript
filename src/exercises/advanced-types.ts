// Given the data below, define a type alias for representing users

let users = [ 
  { 
    name: 'John Smith', 
    age: 30, 
    occupation: 'Software engineer' 
  }, 
  {
    name: 'Kate Müller', 
    age: 28 
  } 
]; 

type User = {
  name: string
  age: number
  occupation?: string
}

// Birds fly. Fish swim. A Pet can be a Bird or Fish. Use type aliases to represent these

type Birds = {
  fly: () => void
}

type Fish = {
  swim: () => void
}

type Pet = Birds | Fish;

// Define a type for representing the days of week. Valid values are “Monday”, “Tuesday”, etc.

type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

// Simplify the following code snippets:

function getUser() { return { address: { street: "Calle" } } }

let user = getUser(); 
// console.log(user && user.address ? user.address.street : undefined); 
console.log(user?.address?.street)

function bar() {}

let foo: null | undefined | string;
//let x = foo !== null && foo !== undefined ? foo : bar(); 
let x = foo ?? bar();

// What is the problem in this piece of code?

let value: unknown = 'a';  
//console.log(value.toUpperCase()); // values es de tipo unknown por lo que no tiene los métodos de la clase string

if (typeof value === 'string')
  console.log(value.toUpperCase())