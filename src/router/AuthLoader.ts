import { getPermissionListAPI } from '@/api'
import { getMenuPath } from '@/utils'

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
