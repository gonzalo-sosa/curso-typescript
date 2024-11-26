# Node con TypeScript

La combinación de **Node.js**, **Express** y **TypeScript** ofrece una base sólida para crear aplicaciones escalables y robustas.

## Ejecutando Código TypeScript con Node.js

Para ejecutar código TypeScript directamente con Node.js, se puede utilizar **ts-node** que permite ejecutar archivos `.ts`.

```bash
npm i -D ts-node
```

## Configurando un Proyecto de Express

Primero, se instala **Express** para gestionar las rutas y servidores HTTP:

```bash
npm i express
```

Luego, se instalan las dependencias necesarias para obtener los tipos de **TypeScript** en **Node.js** y **Express**:

```bash
npm i -D typescript @types/node @types/express
```

Y para facilitar el desarrollo y la recarga automática del servidor durante el proceso de desarrollo, se instala **nodemon**:

```bash
npm i -D nodemon
```

## Creando una Ruta Básica

En Express, las rutas se definen para manejar solicitudes a diferentes URLs.

```ts
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => console.log("Server started"));
```

Este código configura un servidor que escucha en el puerto 8000 y responde con "Hello World!" cuando se accede a la raíz("/").

## Creando un Router

Los **routers** en Express permiten modularizar las rutas y dividir las funcionalidades de la aplicación en diferentes módulos.
El siguiente router gestiona las rutas de **reminderes**:

```ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("List of Reminders");
});

export default router;
```

Luego, se importa y se utiliza el router en el archivo principal de la aplicación:

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

Este código configura una ruta para "/reminders" que será gestionada por el router **reminderRouter**.

## Parsing Request Bodies

Para poder manejar datos que se envían a través de solicitudes POST, se necesita poder leer los cuerpos de cada solicitud. Express tiene un middleware llamado `express.json()` para procesar los cuerpos de las solicitudes en formato JSON:

```ts
import express from "express";
import { Router } from "express";

const app = express();
app.use(express.json()); // Middleware para parsear JSON

const router = Router();
const reminders: Reminder[] = [];

router.get("/", (req, res) => {
  res.json(reminders);
});

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto;
  const reminder = new Reminder(title);
  reminders.push(reminder);

  res.status(201).json(title);
});

export default router;
```

En este ejemplo, cuando se hace una solicitud POST a "/reminders", el servidor recibe el cuerpo de la solicitud, que debe tener un capo **title**. Este campo es utilizado para crear un nuevo recordatorio y agregarlo a la lista de recordatorios.

## Construyendo una API

Al estructurar el proyecto se puede tener diferentes módulos de API. A continuación, su muestra una posible estructura de una API básica para manejar recordatorios:

1. models/reminder.ts: Define el modelo de los recordatorios.
2. routers/reminders.ts: Define las rutas para obtener y agregar recordatorios.
3. server.ts: El archivo principal donde se configura el servidor.

[Ejemplo](./reminders-api/)

Este es un ejemplo básico de cómo construir una API usando Express con TypeScript.

## Resumen

Este es un ejemplo básico de cómo configurar un proyecto Node.js con Express usando TypeScript. Los pasos incluyen:

1. Instalación de las dependencias necesarias para TypeScript y Express.
2. Creación de rutas simples y routers modulares.
3. Manejo de cuerpos de solicitudes con el middleware express.json().
4. Construcción de una API básica para manejar operaciones sobre recordatorios.
