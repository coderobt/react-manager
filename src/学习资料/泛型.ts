function identity<T>(arg: T): T {
  return arg
}

identity<number>(1)

function identity2<T, U>(x: T, y: U): T {
  return x
}
identity2<number, string>(1, '1')
identity2<number, number>(1, 2)

//任意属性
interface Person {
  [k: string]: string | number | boolean
}
//任意属性是不确定有什么属性，泛型是不确定有什么类型

// Pick使用
interface User {
  id: number
  name1: string
  age: number
}

type AgeType = Pick<User, 'age' | 'name1'>
let jack: AgeType = {
  name1: 'jack',
  age: 18
}

export {}
