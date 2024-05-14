import { create } from 'zustand'
import { User } from '@/types/api'

export const useUserStore = create<{
  token: string
  userInfo: {
    userEmail: string
    userName: string
  }
  updateUserInfo: (userInfo: User.UserItem) => void
  updateToken: (token: string) => void
}>(set => ({
  token: '',
  userInfo: {
    userEmail: '',
    userName: ''
  },
  updateUserInfo: (userInfo: User.UserItem) => set({ userInfo }),
  updateToken: (token: string) => set({ token })
}))
