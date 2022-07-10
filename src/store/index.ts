import { createStore } from 'vuex'
import router from '@/router'
import { Task } from '@/models/Task'
import { getTasks, addTask, editTask, deleteTask } from '@/services'

export default createStore({
  state: {
    tasks: [] as Array<Task>,
    task: {
      id: '',
      name: '',
      categories: [],
      state: '',
      number: 0
    } as Task
  },
  getters: {
  },
  mutations: {
    loadFromLS (state, payload) {
      state.tasks = payload
    },
    addTask (state, payload: Task): void {
      state.tasks.push(payload)
    },
    delete (state, payload: string): void {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    task (state, payload: string): void {
      if (!state.tasks.find((task: Task) => task.id === payload) ?? state.task) {
        router.push('/')
        return
      }

      state.task =
        state.tasks.find((task: Task) => task.id === payload) ?? state.task
    },
    update (state, payload: Task): void {
      state.tasks =
        state.tasks.map((task: Task) => task.id === payload.id ? payload : task)
      router.push('/')
    },
    reset (state): void {
      state.task = {
        id: '',
        name: '',
        categories: [],
        state: '',
        number: 0
      }
    }
  },
  actions: {
    async addTask ({ commit }, task: Task): Promise<void> {
      try {
        const res = await addTask(task)
        commit('addTask', res)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    },
    async deleteTask ({ commit }, id: string): Promise<void> {
      try {
        await deleteTask(id)
        commit('delete', id)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    setTask ({ commit }, id: string): void {
      commit('task', id)
    },
    async updateTask ({ commit }, task: Task): Promise<void> {
      try {
        const res = await editTask(task)
        commit('update', res)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
    resetTask ({ commit }): void {
      commit('reset')
    },
    async loadLS ({ commit }): Promise<void> {
      try {
        const res: Task[] = await getTasks()
        commit('loadFromLS', res)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  },
  modules: {
  }
})
