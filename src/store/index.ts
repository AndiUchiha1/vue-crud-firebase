import { createStore } from 'vuex'
import router from '@/router'
import { Task } from '@/models/Task'

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
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    delete (state, payload: string): void {
      state.tasks = state.tasks.filter(task => task.id !== payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
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
    addTask ({ commit }, task: Task): void {
      commit('addTask', task)
    },
    deleteTask ({ commit }, id: string): void {
      commit('delete', id)
    },
    setTask ({ commit }, id: string): void {
      commit('task', id)
    },
    updateTask ({ commit }, data: Task): void {
      commit('update', data)
    },
    resetTask ({ commit }): void {
      commit('reset')
    },
    loadLS ({ commit }): void {
      if (localStorage.getItem('tasks')) {
        const tasks: Array<Task> = JSON.parse(localStorage.getItem('tasks') ?? '[]')
        commit('loadFromLS', tasks)
      }

      localStorage.setItem('tasks', JSON.stringify([]))
    }
  },
  modules: {
  }
})
