import { MutableRefObject } from 'react'
import { User } from '@/types/api'

export type IAction = 'create' | 'edit' | 'delete'

export interface IModalProp {
  mRef: MutableRefObject<{ open: (type: IAction, data: User.UserItem) => void } | undefined>
  update: () => void
}
