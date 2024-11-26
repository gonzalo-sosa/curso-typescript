import axios from "axios";
import Reminder from "../models/reminder";

const API_URL = "https://jsonplaceholder.typicode.com/"

class ReminderService {
  http = axios.create({
    baseURL: API_URL
  })

  async getReminders() {
    const response = await this.http.get<Reminder[]>("/todos")
    return response.data;
  }

  async addReminder(title: string) {
    const response = await this.http.post<Reminder>("/todos", {title})
    return response.data;  
  }

  async removeReminder(id: number) {
    const response = await this.http.delete("/todos/" + id);
    return response.data;
  }
}

export default new ReminderService()