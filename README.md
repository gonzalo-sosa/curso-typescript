# Typescript

Es un superset de javascript, es decir, que amplia las capacidades del lenguaje con tipos estáticos.
Gracias al uso de typescript se pueden evitar problemas en el código que cuestan tiempo y dinero en solucionar. Su uso es perfecto para proyecto de media a gran escalar.

## Entorno de desarrollo

- Instalar node
- Instalar el compilar de typescript de forma global

```bash
npm i -g typescript
```

- En Windows, dar permiso para ejecutar el comandos al usuario actual

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Configuración

1. npm init
2. tsc --init
   Añade la configuración del compilador de typescript. Dentro de esta configuración se habilitan las opciones de "removeComments" y "noEmitOnError".
3. Añadir la opción "sourceMap" para debug
4. Agregar un archivo launch.json y tasks.json para debug en vs code

## Conceptos básicos

El compilar de typescript puede inferir o detectar el tipo de una variable sin necesidad de que la especifique

```ts
let x: number = 10;

let y = 10; // number
```

### Tipos

- any: la variable no tiene ningún tipo y puede ser reasignada sin problemas de tipos.
- number: un número decimal, hexadecimal o flotante
- string: valores encerrados en comillas simples o dobles

```ts
let x: any = 0;

let y: number = 10;

let z: string = "z";
```

#### Arrays

Los arrays sólo pueden ser de un tipo en específico

```ts
let arr1 = [1, 2, "3"]; // <-- ERROR

let arr2: number[] = [1, 2, 3];

let arr3: string[] = ["1", "2", "3"];
```

```ts
let user: [number, string] = [1, "MMM"];
```

#### Enums

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

#### Funciones

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

#### Objetos

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

### Type Aliases

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

### Literal Types

Limitar los valores que se le pueden asignar a una variable

```ts
type Quantity = 50 | 100;
let quantity1: Quantity = 50; // <-- OK
let quantity2: Quantity = 100; // <-- OK

type Metric = "cm" | "inch";
```

### Nullable Types

```ts
function greet(name: string | null) {
  return name ? name.toUpperCase() : "Hola!";
}

greet(null); // <-- OK
```

### Optional Chaining

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

#### Optional Element Access Operator

```ts
customer?.[0];
```

#### Optional Call

```ts
let log: any = null;
log?.("a");
```

### Nullish Coalescing Operator

```ts
let speed: number | null = null;
let ride = {
  speed: speed ?? 30, // retorna 30 si speed es null de lo contrario retorna speed
};
```

### Type Assertions

```ts
let phone = document.getElementById("phone") as HTMLInputElement; // No es una conversión

phone.value;
```

```ts
let phone = <HTMLInputElement>document.getElementById("phone"); // No es una conversión

phone.value;
```

### Unknown type

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

### Never Type

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

## OOP

### Clases

```ts
class Account {
  id: number;
  owner: string;
  balance: number;

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Invalid amount");
    this.balance += amount;
  }
}
```

```ts
let account = new Account(1, "John", 0);

console.log(account instanceof Account); // <-- true
```

### Propiedades de sólo lectura y opcionales

```ts
class Account {
  readonly id: number; // Sólo lectura
  owner: string;
  balance: number;
  nickname?: string; // Opcional

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }
}
```

### Access Control Keywords

```ts
class Account {
  readonly id: number;
  owner: string; // public por defecto
  private _balance: number; // no es accesible por fuera de la clase

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Invalid amount");

    this._balance += amount;
  }

  // No es accesible fuera de la clase
  private calculateTax() {
    //
  }

  get balance(): number {
    return this._balance;
  }
}
```

### Parameter Properties

Crear las propiedades con los argumentos del constructor

```ts
class Account {
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}
}
```

### Getters and Setters

```ts
class Account {
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Invalid amount");

    this._balance += amount;
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error("Invadid value");
    this._balance = value;
  }
}
```

### Index Signatures

```ts
class SeatAssignment {
  [seatNumber: string]: string;
}

let seats = new SeatAssignment();

seats.A1 = "John";
seats["A2"] = "Charlie";
seats["A3"] = 3; // <-- ERROR
```

### Static Members

Los miembros estáticos permiten que se cree una única copia del método o atributo en memoria

```ts
class Ride {
  private static _activeRides: number = 0; // privado para que no sea modificado desde fuera de la clase

  static get activeRides() {
    return Ride._activeRides;
  }

  start() {
    Ride._activeRides++;
  }

  stop() {
    Ride._activeRides--;
  }
}
```

### Inheritance

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  walk() {
    console.log("Walking");
  }
}

class Student extends Person {
  constructor(public studentId: number, firstName: string, lastName: string) {
    super(firstName, lastName);
  }

  takeTest() {
    console.log("Taking test");
  }
}

let student = new Student(1, "John", "Doe");
```

### Method Overriding

```ts
class Teacher extends Person {
  override get fullName() {
    return "Professor" + super.fullName;
  }
}
```

### Polymorphism
