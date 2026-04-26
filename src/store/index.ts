import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: null as null | { name: string },
  }),
  actions: {
    setUser(user: { name: string }) {
      this.user = user
    },
  },
})
