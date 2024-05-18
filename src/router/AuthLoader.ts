import { getPermissionListAPI } from '@/api'
import { getMenuPath } from '@/utils'
import { Menu } from '@/types/api'

export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}

const AuthLoader = async () => {
  const data = await getPermissionListAPI()
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList
  }
}

export default AuthLoader
