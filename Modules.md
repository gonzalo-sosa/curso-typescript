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
