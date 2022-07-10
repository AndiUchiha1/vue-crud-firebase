import { Task } from '@/models/Task'
import axios from 'axios'

export const addTask = async (task: Task): Promise<Task> => {
  const { data } = await axios.put<Task>(`${process.env.VUE_APP_DATABASE_URL}/tasks/${task.id}.json`, {
    ...task
  })
  return data
}
