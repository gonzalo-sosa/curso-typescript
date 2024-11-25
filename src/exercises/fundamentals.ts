// For each of these values, what type will the TypeScript compiler infer?

let a = 100; // number
let b = 'Coffee'; // string  
let c = [true, false, false]; // boolean[]  
let d = {age: number}; // ERROR: se debe de definir age con algún valor, ejemplo age: 10
let e = [3]; // number[]
let f; // any
let g = []; // any[]

//  What are the compilation errors in each of the following code snippets?

let song: {  
title: string, 
releaseYear: number 
} = { title: 'My song' }; // ERROR: falta "releaseYear"

let prices = [100, 200, 300]; 

prices[0] = '$100';  // ERROR: prices es del tipo number[]

function myFunc(a: number, b: number): number { } // ERROR: se definió "number" como valor de retorno pero se está retornando "void"