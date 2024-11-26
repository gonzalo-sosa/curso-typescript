# Conceptos básicos

El compilar de typescript puede inferir o detectar el tipo de una variable sin necesidad de que la especifique

```ts
let x: number = 10;

let y = 10; // number
```

## Tipos

- any: la variable no tiene ningún tipo y puede ser reasignada sin problemas de tipos.
- number: un número decimal, hexadecimal o flotante
- string: valores encerrados en comillas simples o dobles

```ts
let x: any = 0;

let y: number = 10;

let z: string = "z";
```

## Arrays

Los arrays sólo pueden ser de un tipo en específico

```ts
let arr1 = [1, 2, "3"]; // <-- ERROR

let arr2: number[] = [1, 2, 3];

let arr3: string[] = ["1", "2", "3"];
```

```ts
let user: [number, string] = [1, "MMM"];
```

## Enums

Se escriben en PascalCase

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

Se les puede agregar la notación de tipos tanto a sus argumentos como al valor que retornan

```ts
function calculateAverage(...args: number[]): number {
  return args.reduce((prev, curr) => prev + curr, 0) / args.length;
}
```

Los parámetros pueden ser opcionales con el signo de interrogación "?"

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

## Type Aliases

Definir tipos personalizados

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

## Union Types

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

## Intersection Types

Combinar tipos

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

Limitar los valores que se le pueden asignar a una variable

```ts
type Quantity = 50 | 100;
let quantity1: Quantity = 50; // <-- OK
let quantity2: Quantity = 100; // <-- OK

type Metric = "cm" | "inch";
```

## Nullable Types

```ts
function greet(name: string | null) {
  return name ? name.toUpperCase() : "Hola!";
}

greet(null); // <-- OK
```

## Optional Chaining

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

```ts
let speed: number | null = null;
let ride = {
  speed: speed ?? 30, // retorna 30 si speed es null de lo contrario retorna speed
};
```

## Type Assertions

```ts
let phone = document.getElementById("phone") as HTMLInputElement; // No es una conversión

phone.value;
```

```ts
let phone = <HTMLInputElement>document.getElementById("phone"); // No es una conversión

phone.value;
```

## Unknown type

Es preferible usar 'unknown' antes que 'any' ya que este tipo fuerza al compilar a realizar verificaciones al momento de compilar el código.

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

## Never Type

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
