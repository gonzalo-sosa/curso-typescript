# OOP

## Clases

Las clases en TypeScript son similares a las de JavaScript, pero con la ventaja de poder definir tipos para las propiedades y los parámetros del constructor.

Ejemplo básico de una clase "Account":

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

En este ejemplo, la clase `Account` tiene tres propiedades: `id`, `owner` y `balance`. Además, tiene un métodos "deposit" para incrementar el balance de la cuenta.

```ts
let account = new Account(1, "John", 0);

console.log(account instanceof Account); // <-- true
```

## Propiedades de sólo lectura y opcionales

En TypeScript, podemos usar el modificador `readonly` para crear propiedades que no puedan ser modificadas después de la inicialización. Además, podemos marcar propiedades como opcionales utilizando el operador `?`

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

En este ejemplo, `id` es solo lectura, lo que significa que no se puede cambiar una vez asignado. `nickname` es opcional y puede o no estar presente.

## Control de Acceso con palabras clave `private` y `protected`

TypeScript nos permite controlar la visibilidad de las propiedades y métodos de una clase con los modificadores de acceso `public`, `private` y `protected`. Los miembros `private` no pueden ser accedidos fuera de la clase, mientras que los miembros `protected` son accesibles en la clase y sus subclases.

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

  // Accesible por subclases
  protected calculateTax() {
    //
  }

  get balance(): number {
    return this._balance;
  }
}
```

## Parameter Properties

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

## Getters and Setters

Los getters permiten obtener propiedades que pueden no existir, por ejemplo, se puede definir un getter para obtener un nombre completo de una persona pero en la clase persona sólo existen las propiedades nombre y apellido, por lo que se define un método que concatena ambas propiedades con un espacio entre ellas y las retorna. Lo interesante de los getters es que por más que sean definidas como métodos dentro de la clase para ejecutarlas se las llama como una propiedad normal mediante el `.` o por `["nombreDelGetter"]`.

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

En el ejemplo anterior, se retorna la propiedad privada `_balance` en el getter `balance`

## Index Signatures

Se pueden definir la forma de las propiedades de una clase si es que estas no existen.

```ts
class SeatAssignment {
  [seatNumber: string]: string;
}

let seats = new SeatAssignment();

seats.A1 = "John";
seats["A2"] = "Charlie";
seats["A3"] = 3; // <-- ERROR
```

De esta forma, sólo se pueden agregar propiedades del tipo `[seatNumber: string]: string` y las que no cumplan con esta forma lanzarán un error.

## Static Members

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

## Inheritance

Las clases pueden heredar de otras clases, permitiendo la reutilización de código y la extensión de comportamientos. Además, podemos sobrescribir los métodos heredados.

Ejemplo:

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

En este caso, `Student` hereda de `Person` y añade un nuevo método `takTest`.

## Method Overriding

Para sobrescribir un método se deb de utilizar la palabra reservada `override` para indicar al compilador que el método será sobrescrito en la subclase.

```ts
class Teacher extends Person {
  override get fullName() {
    return "Professor" + super.fullName;
  }
}
```

Además, se puede llamar al método definido por el padre con `super` en el método sobrescrito.

## Polymorphism

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

## Private vs Protected members

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

## Abstract Classes and Methods

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

## Interfaces

Las interfaces en TypeScript definen la forma de un objeto y permiten que clases o funciones las implementen.
Definen el comportamiento/implementación de un objeto.

Las clases abstractas son cómo interfaces pero son requieren de mayor escritura para crearlas.

```ts
abstract class Calendar {
  constructor(public name: string) {}

  abstract addEvent(): void;
  abstract removeEvent(): void;
}
```

Mientras que las interfaces son más sencillas.

```ts
interface Calendar {
  name: string;

  addEvent(): void;
  removeEvent(): void;
}
```

Una interfaz, también, puede heredar de otra interfaz para obtener sus atributos y métodos. Para hacerlo, se utiliza la palabra reservada `extends`.

```ts
interface CloudCalendar extends Calendar {
  sync(): void;
}
```

En el siguiente ejemplo, `GoogleCalendar` implementa la interfaz `Calendar`, asegurando que contenga los métodos `addEvent` y `removeEvent`

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

## Generics Classes

Las clases genéricas permiten que diferentes tipos de datos sea utilizados de manera segura y flexible.

Por lo general se utiliza `T` para indicar el tipo de dato genérico.

```ts
class KeyValuePair<T> {
  constructor(public key: T, public value: string) {}
}

const pair1 = new KeyValuePair<number>(10, "ten");
const pair2 = new KeyValuePair<string>("10", "ten");
```

Pero cuando se utiliza más de uno, es preferible usar nombres que se adecuen al uso de cada genérico.

```ts
// K -> key
// V -> value
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

const pair1 = new KeyValuePair(10, "ten"); // <number, string>
const pair2 = new KeyValuePair("ten", 10); // <string, number>
```

En este ejemplo, `KeyValuePair` es una clase genérica que puede manejar cualquier tipo de clave y valor.

## Generics Functions

Las funciones, también, pueden recibir parámetros y devolver datos genéricos.

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

## Generic Interfaces

Se pueden definir interfaces con datos genéricos.

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

## Generic Constraints

Las constraints permiten restringir los tipos de datos que puede adoptar un valor genérico.

En este ejemplo, la función `echo` recibe y devuelve un valor genérico que puede ser de cualquier tipo, incluso 'undefined'.

```ts
function echo<T>(value: T): T {
  return value;
}
```

Pero, se puede restringir los valores a `number` y `string`. De esta forma se evita que se llame a la función sin ningún parámetro.

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

## Extending Generic Classes

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

## Keyof Operator

TypeScript ofrece herramientas como el operador `keyof`, que nos permite obtener las clase de un tipo como un conjunto de literales.

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

## Type Mapping

Las keys obtenidas con "keyof" se pueden mapear.

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
