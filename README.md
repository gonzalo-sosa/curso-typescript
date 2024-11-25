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

Open Closed Principle

```ts
class Principal extends Person {
  override get fullName() {
    return "Principal" + super.fullName;
  }
}

let arr: Person[] = [
  new Student("1", "John", "Smith"),
  new Teacher("Mosh", "Hamedani"),
  new Principal("Mary", "Smith"),
];

arr.forEach((p) => console.log(p.fullName));
```

### Private vs Protected members

Ambos no pueden ser accedidos por fuera de la clase.
Los miembros privados no se heredan, los métodos protegidos si.

```ts
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  private walk() {
    console.log("Walking");
  }

  protected run() {
    console.log("Running");
  }
}

class Teacher extends Person {
  takTest() {
    this.walk(); // <-- ERROR
    this.running(); // <-- OK
  }
}
```

### Abstract Classes and Methods

```ts
class Shape {
  constructor(public color: string) {}

  render() {}
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override render(): void {
    console.log("Rendering a circle");
  }
}

const shape = new Shape("red");
shape.render(); // <-- No tiene sentido
```

```ts
abstract class Shape {
  constructor(public color: string) {}

  abstract render(): void;
}

const shape = new Shape("red"); // <-- ERROR: no se puede instanciar de una clase abstracta

class Circle extends Shape() {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override render(): void {
    console.log("Rendering a circle");
  }
}
```

### Interfaces

Definen el comportamiento/implementación de un objeto.

```ts
abstract class Calendar {
  constructor(public name: string) {}

  abstract addEvent(): void;
  abstract removeEvent(): void;
}
```

```ts
interface Calendar {
  name: string;

  addEvent(): void;
  removeEvent(): void;
}
```

```ts
interface CloudCalendar extends Calendar {
  sync(): void;
}
```

```ts
class GoogleCalendar implements Calendar {
  constructor(public name: string) {}

  addEvent(): void {
    //
  }

  removeEvent(): void {
    //
  }
}
```

## Generics

### Generics Classes

```ts
class KeyValuePair<T> {
  constructor(public key: T, public value: string) {}
}

const pair1 = new KeyValuePair<number>(10, "ten");
const pair2 = new KeyValuePair<string>("10", "ten");
```

```ts
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

const pair1 = new KeyValuePair(10, "ten"); // <number, string>
const pair2 = new KeyValuePair("ten", 10); // <string, number>
```

### Generics Functions

```ts
function wrapInArray<T>(value: T) {
  return [value];
}

let numbers1 = wrapInArray(1);
let numbers2 = wrapInArray("a");
```

```ts
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}
```

### Generic Interfaces

```ts
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}
interface Product {
  title: string;
}

let result1 = fetch<User>("api/user");

console.log(result1.data?.username);

let result2 = fetch<Product>("api/product");

console.log(result2.data?.title);
```

### Generic Constraints

```ts
function echo<T>(value: T): T {
  return value;
}
```

```ts
function echo<T extends number | string>(value: T): T {
  return value;
}

echo("1"); // <-- OK
echo(1); // <-- OK
echo(true); // <-- ERROR
```

```ts
function echo<T extends Person>(value: T): T {
  return value;
}

echo(new Student(1, "Marcos", "Cash"));
echo(new Principal("John", "Smith"));
```

### Extending Generic Classes

```ts
interface Product {
  name: string;
  price: number;
}

class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
}
```

```ts
// Se pasa el parámetro genérico T
class CompressibleStore<T> extends Store<T> {
  compress() {}
}

let store = new CompressibleStore<Product>();

store.compress();

// Restringiendo el tipo del parámetro genérico, indicando que debe de tener por lo menos el atributo name
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}
```

```ts
// Tipo específico
class ProductStore extends Store<Product> {
  filterByMinPrice(minPrice: number): Product[] {
    return this._objects.filter((obj) => obj.price >= minPrice);
  }
}
```

### Keyof Operator

```ts
class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }

  // if T is Product
  // then keyof T => 'name' | 'price'
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}
```

### Type Mapping

Las keys obtenidas con "keyof" se pueden iterar.

```ts
interface Product {
  name: string;
  price: number;
}

type ReadOnlyProduct = {
  readonly [K in keyof Product]: Product[K];
};
```

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

let product: ReadOnly<Product> = {
  name: "a",
  price: 10,
};

product.name = "b"; // <-- ERROR
```

```ts
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};
```

Para ver más tipos que ya están construidos(utility types) en typescript ver la [documentación](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Decoradores

Los decoradores son funciones que se ejecutan una única vez que es la creación de la clase que lo aplique. El decorador al ser una función, recibe por parámetro el constructor de la clase que lo utilice y puede agregar tanto atributos como métodos a través del uso del prototipo.

### Class Decorators

```ts
function Component(constructor: Function) {
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDOM = () => {
    console.log("Inserting the component in the DOM");
  };
}

@Component
class ProfileComponent {}
```

### Parameterized Decorators

```ts
type ComponentOptions = {
  selector: string;
};

// Decorator factory
function Component(options: ComponentOptions) {
  return (constructor: Function) => {
    constructor.prototype.options = options;
  };
}

@Component({ selector: "#my-profile" })
class ProfileComponent {}
```

### Decorator Composition

Se aplican como la composición de funciones, primero se aplica de adentro hacia afuera. Ejemplos: f(g(x)).

```ts
@Component // Segunda llamada
@Pipe // Primera llamada
class ProfileComponent {}
```

### Method Decorators

```ts
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function;
  // Sólo puede realizarse con function ya que las arrow functions reescriben this
  descriptor.value = function (...args: any) {
    console.log("Before");
    original.call(this, ...args);
    console.log("After");
  };
}

class Person {
  @Log
  say(message: string) {
    console.log("Person says " + message);
  }
}
```

### Accessor Decorators

```ts
function Capitalize(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.get;

  descriptor.get = function () {
    const result = original?.call(this);

    return typeof result === "string" ? result.toUpperCase() : result;
  };
}

class Person {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    return this.firstName + " " + this.lastName;
  }
}
```

### Property Decorators

```ts
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(
            `${propertyName} should have at least have ${length} characters.`
          );
        value = newValue;
      },
    };

    Object.defineProperty(target, propertyName, descriptor);
  };
}

class User {
  @MinLength(4)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}
```

```ts
let user1 = new User("1234"); // <-- OK
let user2 = new User("123"); // <-- ERROR

user1.password = "1"; // <-- ERROR
```

### Parameter Decorators

```ts
type WatchedParameter = {
  methodName: string;
  parameterIndex: number;
};

const watchedParameters: WatchedParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
  watchedParameters.push({
    methodName,
    parameterIndex,
  });
}

class Vehicle {
  move(@Watch speed: number) {}
}
```

## Modules

### Exporting and Importing

```ts
// shapes.ts
export class Circle {}

export class Square {}
```

```ts
// main.ts
import { Circle, Square } from "./shapes";
```

```ts
// types.d.ts
export interface Product {}
```

### Default Exports

```ts
// storage.ts
export default class Store {}

export enum Format {
  Raw,
  Compressed,
}

class Compressor {} // No existe fuera de este modulo
class Encryptor {} // No existe fuera de este modulo
```

```ts
// main.ts
import Store. { Format } from "./storage";
```

### Wildcard Imports

```ts
// main.ts
import * as Shapes from "./shapes";

let circle = new Shapes.Circle(1);
```

### Re-exporting

```ts
// shapes/Circle.ts
export default class Circle {}
```

```ts
// shapes/Square.ts
export default class Square {}
```

```ts
// shapes/index.ts
export Circle from "./Circle.ts";
export Square from "./Square.ts";
```

```ts
// main.ts
import { Circle, Square } from "./shapes";
```

## Integration with JavaScript

### Including JS Code in TS Projects

Habilitar la opción "allowJs" en la configuración de typescript.
Modificar el módulo a "commonJs"

### Type Checking JS Code

Habilitar opción "checkJs"

```js
// utils/fn.js
export function calculateTax(income) {
  return income * 0.3;
}
```

```ts
// main.ts
import { calculateTax } from "./utils/fn";

calculateTax(); // <-- ERROR: income tiene el tipo 'any' implícitamente
```

### Describing Types Using JSDoc

```js
/**
 *
 * @param {number} income
 * @returns {number}
 */
export function calculateTax(income) {
  return income * 0.3;
}
```

```ts
calculateTax(4); // <-- OK
calculateTax(); // <-- ERROR: se esperaba un argumento del tipo number
```

### Creating Declaration Files

Los archivos de definición de tipos tienen la nomenclatura "< type >.d.ts" por ejemplo "tax.d.ts"

```ts
// types/tax.d.ts
export declare function calculareTax(income: number): number;
```

### Using Definitely Types Declaration Files

Instalar la dependencia

```bash
npm i lodash
```

Instalar los tipos

```bash
npm i -D @types/lodash
```

## Creating a React app with TypeScript

Luego de "vite@latest" va el nombre de la aplicación.

```bash
npm create vite@latest my-react-app --template react-ts
```

### Adding Bootstrap

```bash
npm i bootstrap
```

Importar el css del bootstrap en la entrada de la aplicación, es decir, en el archivo "main.tsx"

```tsx
import "bootstrap/dist/css/bootstrap.css";
import "index.css";
```

### Creating a Component

```ts
// models/reminder.d.ts
export default interface Reminder {
  id: number;
  title: string;
}
```

```tsx
// components/ReminderList.tsx
import React from "react";
import Reminder from "../models/reminder";

interface ReminderListProps {
  items: Reminder[];
}

function ReminderList({ items }: ReminderListProps) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

export default ReminderList;
```

```tsx
// App.tsx
import "./App.css";
import ReminderList from "./components/ReminderList";
import Reminder from "./models/reminder";

const reminders: Reminder[] = [{ id: 1, title: "Reminder 1" }];

function App() {
  return (
    <>
      <ReminderList items={reminders} />
    </>
  );
}

export default App;
```

### Using the State Hook

Se utiliza "useState" para modificar el renderizado del componente cada vez que se modifiquen los reminder;

### Calling the Backend

Para simular el backend, se realiza la llamada a un api ["jsonplaceholder"](https://jsonplaceholder.typicode.com/) que devuelve un conjunto de datos de diferentes tipos.

Se instala el paquete "axios"

```bash
npm i axios
```

Clase que realiza las peticiones a la api

```ts
import axios from "axios";
import Reminder from "../models/reminder";

const API_URL = "https://jsonplaceholder.typicode.com/";

class ReminderService {
  http = axios.create({
    baseURL: API_URL,
  });

  async getReminders() {
    const response = await this.http.get<Reminder[]>("/todos");
    return response.data;
  }

  async addReminder(title: string) {
    const response = await this.http.post<Reminder>("/todos", { title });
    return response.data;
  }

  async removeReminder(id: number) {
    const response = await this.http.delete("/todos/" + id);
    return response.data;
  }
}

// exporta una nueva instancia de la clase
export default new ReminderService();
```

### Using the Effect Hook

```tsx
function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const reminders = await reminderService.getReminders();
    setReminders(reminders);
  };

  return (
    <div className="app">
      <ReminderList items={reminders} />
    </div>
  );
}

export default App;
```

### Handling Events

Para quitar elementos de la lista se le pasa una función al componente "ReminderList" que toma un id como parámetro y filtra de la lista actual para asignar la lista filtrada al estado. Para esto, se debe modificar el componente "ReminderList", agregando el método a recibir tanto en la interfaz como en la lista de parámetros y enviarle esta función al evento "onClick" del botón. Es importante crear una función flecha que ejecute la función onRemoveReminder dentro ya que sino se interpretará que se quiere enviar una función que reciba el evento como parámetro.

```tsx
const removeReminder = (id: number) => {
  setReminders(reminders.filter((reminder) => reminder.id !== id));
};

return (
  <div className="app">
    <ReminderList items={reminders} onRemoveReminder={removeReminder} />
  </div>
);
```

```tsx
import Reminder from "../models/reminder";

interface ReminderListProps {
  items: Reminder[];
  onRemoveReminder: (id: number) => void;
}

function ReminderList({ items, onRemoveReminder }: ReminderListProps) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li className="list-group-item" key={item.id}>
          {item.title}
          <button
            onClick={() => {
              onRemoveReminder(item.id);
            }}
            className="btn btn-outline-danger mx-2 rounded-pill"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ReminderList;
```

### Building a Form

### Handling Form Submission

## Node with TypeScript

### Executing TypeScript Code With Node

```bash
npm i -D ts-node
```

### Setting Up an Express Project

```bash
npm i express
```

```bash
npm i -D typescript @types/node @types/express
```

```bash
npm i -D nodemon
```

### Creating a Basic Route

```ts
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

### Creating a Router

```ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("List of Reminders");
});

export default router;
```

```ts
import express from "express";
import reminderRouter from "./routers/reminders";

const app = express();

app.use("/reminders", reminderRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => console.log("Server started"));
```

### Parsing Request Bodies

### Building an API
