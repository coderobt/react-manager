import { formatMoney } from '../utils'
import { Button } from 'antd'
import dayjs from 'dayjs'

export default function Welcome() {
  const handleClick = () => {
    console.log(formatMoney('123124124124'))
    console.log(dayjs().format('YYYY-MM-DD'))
  }
  return <Button onClick={handleClick}>点击事件</Button>
}
