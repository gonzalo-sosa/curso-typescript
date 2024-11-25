import express from "express"
import reminderRouter from "./routers/reminders"

const app = express()

app.use(express.json())
app.use("/reminders", reminderRouter)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(8000, () => console.log("Server started"))