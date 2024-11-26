# Conceptos básicos

El compilador de TypeScript es capaz de inferir el tipo de una variable en función de su valor inicial, lo que significa que no siempre es necesario declarar el tipo explícitamente:

```ts
let x: number = 10;

let y = 10; // Inferido como 'number'
```

## Tipos

- `any`: Una variable con tipo `any` puede contener cualquier valor y se puede reasignar sin restricciones de tipo.
- `number`: Para números decimales, hexadecimales o flotantes.
- `string`: Para cadenas de texto, ya sean comillas simples, dobles o backticks.

```ts
let x: any = 0;

let y: number = 10;

let z: string = "z";
```

## Arrays y Tuplas

Los arrays sólo pueden ser de un tipo en específico, es decir, que los elementos que contienen deben ser del mismo tipo.

```ts
let arr1 = [1, 2, "3"]; // <-- ERROR

let arr2: number[] = [1, 2, 3];

let arr3: string[] = ["1", "2", "3"];
```

Las tuplas son definidas en forma de arrays pero traen consigo el problema de que al realizar `.push()` con un tipo de dato que no adecua al declarada este no dará error.

```ts
let user: [number, string] = [1, "MMM"];
```

## Enums

Los enums permiten definir un conjunto de constantes con nombres legibles, que pueden ser numéricas o de tipo string.
Se escriben en PascalCase.

```ts
enum Size {
  Small, // 0
  Medium, // 1
  Large, // 2
}

enum Size {
  Small = 1,
  Medium, // 2
  Large, // 3
}

enum Size {
  Small = "s",
  Medium = "m",
  Large = "l",
}
```

Para que se cree un código más compacto se agrega el "const" antes del enum para que el javascript generado sólo sea el "Size = 2";

```ts
const enum Size {
  Small = 1,
  Medium,
  Large,
}
let mySize: Size = Size.Medium;
```

## Funciones

Se les puede agregar la notación de tipos tanto a sus argumentos como al valor que retornan.

```ts
function calculateAverage(...args: number[]): number {
  return args.reduce((prev, curr) => prev + curr, 0) / args.length;
}
```

Los parámetros pueden ser opcionales con el signo de interrogación `?`

```ts
function calculateTax(income: number, taxYear?: number): number {
  return (taxYear || 2022) < 2022 ? income * 1.2 : income * 1.3;
}
```

Otra aproximación sería agregarle un valor por defecto al parámetro

```ts
function calculateTax(income: number, taxYear = 2022): number {
  return taxYear < 2022 ? income * 1.2 : income * 1.3;
}
```

## Objetos

TypeScript permite definir objetos con tipos específicos para sus propiedades, incluyendo la posibilidad de hacerlas de solo lectura con `readonly`

```ts
let employee: {
  id: number;
  name: string;
} = { id: 1, name: "John" };
```

```ts
let employee: {
  readonly id: number;
  name: string;
} = { id: 1, name: "John" };

employee.id = 2; // <-- ERROR
```

Con propiedades `readonly`:

```ts
let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "John",
  retire: (date: Date) => {
    console.log(date);
  },
};

employee.retire(new Date());
```

## Alias de Tipos

Se pueden crear alias para tipos complejos usando `type`, lo cual facilita la reutilización de tipos en distintas partes del código.

```ts
type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};

let employee: Employee = {
  id: 1,
  name: "John",
  retire: (date: Date) => console.log(date),
};
```

## Tipos Combinados

### Union Types

Agregar más de un tipo a un argumento o variable

```ts
// weight puede ser number o string
function kgToLbs(weight: number | string) {
  // Narrowing
  if (typeof weight === "number") {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2.2;
  }
}

khToLbs(10);
khToLbs("10kg");
```

### Intersection Types

Permiten combinar múltiples tipos en uno solo.

```ts
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};
```

## Literal Types

Permiten limitar los valores que se le pueden asignar a una variable.

```ts
type Quantity = 50 | 100;
let quantity1: Quantity = 50; // <-- OK
let quantity2: Quantity = 100; // <-- OK

type Metric = "cm" | "inch";
```

## Nullable Types

Es posible declarar variables que puedan ser nulas.

```ts
function greet(name: string | null) {
  return name ? name.toUpperCase() : "Hola!";
}

greet(null); // <-- OK
```

## Optional Chaining

El operador de encadenamiento opcional (`?.`) permite acceder a propiedades de objetos de forma segura, evitando errores si el objeto es `null` o `undefined`.

```ts
type Customer = {
  birthday: true;
};

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);

console.log(customer?.birthday); // Se ejecuta sólo si existe customer
console.log(customer?.birthday?.getFullYear()); // Se ejecuta si customer y si existe birthday
```

### Optional Element Access Operator

```ts
customer?.[0];
```

### Optional Call

```ts
let log: any = null;
log?.("a");
```

## Nullish Coalescing Operator

El operador `??` devuelve un valor predeterminado solo si la expresión es `null` o `undefined`.

```ts
let speed: number | null = null;
let ride = {
  speed: speed ?? 30, // retorna 30 si speed es null de lo contrario retorna speed
};
```

## Type Assertions

Las aserciones de tipo permiten al desarrollador decirle al compilador que confíe en el tipo de una variable.

```ts
let phone = document.getElementById("phone") as HTMLInputElement; // No es una conversión

phone.value;
```

```ts
let phone = <HTMLInputElement>document.getElementById("phone"); // No es una conversión

phone.value;
```

## Tipos Especiales

### Unknown type

Es preferible usar 'unknown' antes que 'any' ya que este tipo fuerza al compilador a realizar verificaciones al momento de compilar el código.

```ts
function render(document: any) {
  document.move(); // <-- ERROR al ejecutar
  document.fly();
}

function render(document: unknown) {
  document.move(); // <-- ERROR al compilar
  document.fly();
}
```

### Never Type

Se utiliza cuando una función nunca retorna (por ejemplo, lanzando una excepción o entrando en un bucle infinito).

```ts
function processEvents(): never {
  while (true) {
    //
  }
}

processEvents();
console.log("Hello!"); // <-- Nunca llega a ser ejecutado
```

```ts
function reject(message: string): never {
  throw new Error(message);
}

reject("...");
console.log("Hello!"); // <-- Nunca llega a ser ejecutado
```
