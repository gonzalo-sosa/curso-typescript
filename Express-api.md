# Node with TypeScript

## Executing TypeScript Code With Node

```bash
npm i -D ts-node
```

## Setting Up an Express Project

```bash
npm i express
```

```bash
npm i -D typescript @types/node @types/express
```

```bash
npm i -D nodemon
```

## Creating a Basic Route

```ts
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

## Creating a Router

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

## Parsing Request Bodies

```ts
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

## Building an API

[Ejemplo](./reminders-api/)
