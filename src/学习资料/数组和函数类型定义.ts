// 数组类型定义

const list: number[] = [1, 2, 3, 4, 5]

const list2: Array<number> = [1, 2, 3, 4, 5]

const list3: [number, string, boolean] = [1, '2', true]

const list4: [{ name: string; age: number }] = [{ name: 'jack', age: 20 }]

const list5: Array<{ name: string; age: number }> = [{ name: 'jack', age: 20 }]

interface User {
  name: string
  age: number
}
const list6: Array<User> = [{ name: 'jack', age: 20 }]

// 函数类型定义
function add(a: number, b: number): void {
  console.log(a, b)
}

const add2 = (a: number, b: number): number => {
  return a + b
}

const add3: (a: number, b: number) => number = (a, b) => {
  return a + b
}

export {}
