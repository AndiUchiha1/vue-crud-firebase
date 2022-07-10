import { Task } from '@/models/Task'
import axios from 'axios'

export const editTask = async (task: Task): Promise<Task> => {
  const { data } = await axios.patch<Task>(`${process.env.VUE_APP_DATABASE_URL}/tasks/${task.id}.json`, {
    ...task
  })

  return data
}
