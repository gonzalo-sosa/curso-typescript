# Creating a React app with TypeScript

Luego de "vite@latest" va el nombre de la aplicación.

```bash
npm create vite@latest my-react-app --template react-ts
```

## Adding Bootstrap

```bash
npm i bootstrap
```

Importar el css del bootstrap en la entrada de la aplicación, es decir, en el archivo "main.tsx"

```tsx
import "bootstrap/dist/css/bootstrap.css";
import "index.css";
```

## Creating a Component

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

## Using the State Hook

Se utiliza "useState" para modificar el renderizado del componente cada vez que se modifiquen los reminder;

## Calling the Backend

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

## Using the Effect Hook

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

## Building a Form

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

## Handling Form Submission

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

```tsx
// App.tsx

const addReminder = async (title: string) => {
  const newReminder = await reminderService.addReminder(title);
  setReminders([newReminder, ...reminders]);
};

return (
  <div className="app">
    <NewReminder onAddReminder={addReminder} />
    <ReminderList items={reminders} onRemoveReminder={removeReminder} />
  </div>
);
```
