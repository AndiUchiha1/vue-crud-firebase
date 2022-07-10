import { Task } from '@/models/Task'
import axios from 'axios'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get(`${process.env.VUE_APP_DATABASE_URL}/tasks.json`)
  const tasksArray: Task[] = Object.values(data)

  return tasksArray
}
