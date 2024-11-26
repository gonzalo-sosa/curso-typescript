# Decoradores

Los decoradores son una característica avanzada en TypeScript que permiten añadir comportamientos adicionales a clases, métodos, propiedades y parámetros. Se implementan como funciones y se aplican a las clases o miembros de las clases durante su creación, lo que facilita la modificación o extensión de su funcionalidad. Un decorador se aplica utilizando el símbolo `@` seguido del nombre de la función decoradora.

Un decorador es una función que recibe el objetivo que está siendo decorado, como el constructor de una clase, y puede modificar su comportamiento agregando propiedades, métodos o alterando su lógica.

## Decoradores de Clase

Un decorador de clase se aplica a la clase misma. Se utiliza para modificar o agregar propiedades y métodos a la clase.

```ts
function Component(constructor: Function) {
  constructor.prototype.uniqueId = Date.now(); // Agrega un id único
  constructor.prototype.insertInDOM = () => {
    // Método adicional
    console.log("Inserting the component in the DOM");
  };
}

@Component
class ProfileComponent {}
```

## Decoradores Parametrizados

Los decoradores parametrizados son aquellos que devuelven otra función que se ejecutará sobre el objeto que se pasa como argumento. Se utilizan cuando queremos pasar configuraciones u opciones a los decoradores.

```ts
type ComponentOptions = {
  selector: string;
};

// Decorator factory
function Component(options: ComponentOptions) {
  return (constructor: Function) => {
    constructor.prototype.options = options; // Agrega opciones a la clase
  };
}

@Component({ selector: "#my-profile" })
class ProfileComponent {}
```

En el ejemplo anterior, el decorador `@Component` recibe un objeto con opciones, como un selector CSS, y lo agrega como una propiedad en la clase.

## Composición de Decoradores

Se aplican como la composición de funciones, primero se aplica de adentro hacia afuera. Ejemplos: f(g(x)).

```ts
@Component // Segunda llamada
@Pipe // Primera llamada
class ProfileComponent {}
```

En este caso, el decorador `@Pipe` se aplica primero, y luego se aplica `@Component`.

## Decoradores de Métodos

Los decoradores de métodos se aplican a los métodos de las clases. Son útiles para modificar el comportamiento de los métodos, como agregar logging o validar la ejecución.

```ts
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function;
  // Sólo puede realizarse con function ya que las arrow functions reescriben this
  descriptor.value = function (...args: any) {
    console.log("Before");
    original.call(this, ...args); // Llamada al método original
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

El decorador `@Log` envuelve el método `say`, agregando un log antes y después de la ejecución del método.

## Decoradores Accessor

Los decoradores accessor se aplican a los métodos `get` o `set` de las propiedades. Permiten modificar el comportamiento, como transformar el valor antes de que sea devuelto o asignado.

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

El decorador `@Capitalize` convierte el nombre completo de la persona en mayúsculas antes de devolverlo.

## Decoradores de Propiedades

Los decoradores de propiedades se aplican a las propiedades de las clases. Pueden ser utilizados para definir comportamientos adicionales, como validaciones o transformaciones, al asignar valores a las propiedades.

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

En este ejemplo, el decorador `@MinLength(4)` valida que la longitud de la propiedad `password` sea mayor o igual a 4 caracteres.

```ts
let user1 = new User("1234"); // <-- OK
let user2 = new User("123"); // <-- ERROR: La contraseña es demasiado corta

user1.password = "1"; // <-- ERROR: La contraseña es demasiado corta
```

## Decoradores de Parámetros

Los decoradores de parámetros se aplican a los parámetros de los métodos. Son útiles para realizar o modificar la forma en que se manejan los parámetros en los métodos.

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

En este ejemplo, `@Watch` registra el índice del parámetro para realizar un seguimiento de su uso.

## Resumen

Los decoradores en TypeScript permiten una gran flexibilidad al trabajar con clases, métodos, propiedades y parámetros. A través de ellos, se puede añadir lógica adicional, modificar comportamientos y mejorar la reutilización del código. Sin embargo, los decoradores son una característica avanzada que se debe usar con cuidado para evitar complicar demasiado la lógica del programa.
