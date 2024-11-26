# Decoradores

Los decoradores son funciones que se ejecutan una única vez que es la creación de la clase que lo aplique. El decorador al ser una función, recibe por parámetro el constructor de la clase que lo utilice y puede agregar tanto atributos como métodos a través del uso del prototipo.

## Class Decorators

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

## Parameterized Decorators

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

## Decorator Composition

Se aplican como la composición de funciones, primero se aplica de adentro hacia afuera. Ejemplos: f(g(x)).

```ts
@Component // Segunda llamada
@Pipe // Primera llamada
class ProfileComponent {}
```

## Method Decorators

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

## Accessor Decorators

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

## Property Decorators

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

## Parameter Decorators

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
