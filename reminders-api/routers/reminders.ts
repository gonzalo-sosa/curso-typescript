import { Router } from "express"
import CreateReminderDto from "../dtos/create-reminder"
import Reminder from "../modules/reminder"

const router = Router()
const reminders: Reminder[] = []

router.get("/", (req, res) => {
  res.json(reminders)
})

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto 
  const reminder = new Reminder(title);
  reminders.push(reminder)

  res.status(201).json(title)
})

export default router;