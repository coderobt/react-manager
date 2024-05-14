import { create } from 'zustand'
import { User } from '@/types/api'

export const useUserStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  collapsed: boolean
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
  updateCollapsed: () => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  },
  collapsed: false,
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token }),
  updateCollapsed: () => set(state => ({ collapsed: !state.collapsed }))
}))
