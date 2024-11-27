# Creando una Aplicación React con TypeScript

La integración de React con TypeScript permite aprovechar las ventajas de ambos, como la gestión de tipos estáticos y el rendimiento de React para construir interfaces de usuario robustas.

Para iniciar un proyecto de React con TypeScript, utilizamos Vite, que es un bundler rápido y eficiente para aplicaciones modernas:

```bash
npm create vite@latest my-react-app --template react-ts
```

Esto crea una nueva aplicación de React con TypeScript preconfigurado.

## Agregando Bootstrap

Para agregar **Bootstrap** a la aplicación, se instala el paquete a través de npm:

```bash
npm i bootstrap
```

Luego, se importa el archivo CSS de Bootstrap en el archivo de entrada de la aplicación (`main.tsx`):

```tsx
import "bootstrap/dist/css/bootstrap.css";
import "index.css";
```

## Creando un Componente

Definimos una interfaz de tipo **Reminder** en TypeScript, que modela los datos que queremos manejar:

```ts
// models/reminder.d.ts
export default interface Reminder {
  id: number;
  title: string;
}
```

Luego, se crea el componente **ReminderList** que recibe un array de objetos **Reminder** y los muestra en una lista:

```tsx
// components/ReminderList.tsx
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

Finalmente, se agrega el componente **ReminderList** en `App.tsx`, pasándole un array de recordatorios:

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

## Usando el Hook useState

El hook `useState` permite mantener el estado de los datos y actualizar el renderizado de los componentes. En este caso, usamos `useState` para manejar los **reminders**:

```tsx
const [reminders, setReminders] = useState<Reminder[]>([]);
```

## Llamadas al Backend

Para simular el backend, se realiza la llamada a la API [JSONPlaceholder](https://jsonplaceholder.typicode.com/), un servicio que devuelve datos de prueba. **Axios** para realizar las solicitudes HTTP:

Se instala el paquete "axios"

```bash
npm i axios
```

Clase **ReminderService** para gestionar las peticiones a la API:

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

## Usando el Hook useEffect

El hook `useEffect` permite ejecutar efectos, como la obtención de la API, después del renderizado del componente. En este caso, `useEffect` para cargar los recordatorios desde la API cuando se monta el componente:

```tsx
function App() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadReminders();
  }, []); // Se ejecuta solo una vez al montar el componente

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

## Handling Events

Para quitar elementos de la lista se le pasa una función al componente "ReminderList" que toma un id como parámetro y filtra de la lista actual para asignar la lista filtrada al estado. Para esto, se debe modificar el componente "ReminderList", agregando el método a recibir tanto en la interfaz como en la lista de parámetros y enviarle esta función al evento "onClick" del botón. Es importante crear una función flecha que ejecute la función onRemoveReminder dentro ya que sino se interpretará que se quiere enviar una función que reciba el evento como parámetro.

```tsx
// App.tsx
const removeReminder = (id: number) => {
  setReminders(reminders.filter((reminder) => reminder.id !== id));
};

return (
  <div className="app">
    <ReminderList items={reminders} onRemoveReminder={removeReminder} />
  </div>
);
```

Dentro del componente **ReminderList**, se añade un botón para eliminar el recordatorio:

```tsx
// components/ReminderList.tsx
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

## Construyendo el Formulario

Se crea un formulario para agregar nuevos recordatorios. Se utiliza **useState** para manejar el valor del campo de entrada:

```tsx
// components/NewReminder.tsx
import { useState } from "react";

interface NewReminderProps {
  onAddReminder: (title: string) => void;
}

function NewReminder({ onAddReminder }: NewReminderProps): JSX.Element {
  const [title, setTitle] = useState("");

  return (
    <form>
      <label htmlFor="title"></label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        type="text"
        className="form-control"
      />
      <button className="btn btn-primary my-3 rounded-pill">
        Add Reminder
      </button>
    </form>
  );
}

export default NewReminder;
```

## Manejo de Envíos de Formularios

Se agrega un manejador para envío del formulario. Con el evento **onSubmit** se evitar que la página se recargue y se llama a la función que agrega el recordatorio:

```tsx
// components/NewReminder.tsx
import { useState } from "react";

interface NewReminderProps {
  onAddReminder: (title: string) => void;
}

function NewReminder({ onAddReminder }: NewReminderProps): JSX.Element {
  const [title, setTitle] = useState("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddReminder(title);
    setTitle("");
  };

  return (
    <form onSubmit={submitForm}>
      <label htmlFor="title"></label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id="title"
        type="text"
        className="form-control"
      />
      <button className="btn btn-primary my-3 rounded-pill">
        Add Reminder
      </button>
    </form>
  );
}

export default NewReminder;
```

Y en el componente **App**, se define una función para agregar el recordatorio a la lista mediante el uso del **reminderService**:

```tsx
// App.tsx

const addReminder = async (title: string) => {
  const newReminder = await reminderService.addReminder(title);
  setReminders([newReminder, ...reminders]);
};

return (
  <div className="app">
    <!-- Se le pasa la función al componente -->
    <NewReminder onAddReminder={addReminder} />
    <ReminderList items={reminders} onRemoveReminder={removeReminder} />
  </div>
);
```

## Resumen

[Ejemplo](./apps/react-with-typescript/)

Al integrar React con TypeScript, obtenemos los beneficios de un desarrollo más seguro y escalable. Usamos herramientas como useState, useEffect, y axios para manejar el estado, efectos secundarios, y la comunicación con APIs externas. Además, TypeScript asegura que los tipos de datos sean consistentes y ayuda a prevenir errores en tiempo de desarrollo.
