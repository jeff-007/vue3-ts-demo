<template>
  <div></div>
</template>

<script setup lang="ts">
/**
 * @description 基于对象实现的栈，除了toString，其余方法复杂度均为O(1)
 * @description 基于数组的栈，时间复杂度为O(n)，n表示数组长度，即最坏情况下需要迭代整个数组直到找到所需元素，
 * @param {number} count 栈长度
 */
class Stack<T> {
  count: number;
  private items: {[key: number]: T};
  constructor () {
    this.count = 0
    this.items = {}
  }

  push (element: T) {
    this.items[this.count] = element
    this.count++
  }

  pop (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  peek (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

  size (): number {
    return this.count
  }

  isEmpty (): boolean {
    return this.count === 0
  }

  // 基于数组的栈，可以直接使用数组中的toString方法输出栈中的元素，形如 [1, 2, 3].toString() => '1,2,3'
  // 对象版本的栈，需要手动实现
  toString (): string {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}

/**
 * 示例
 * @param {number} decNumber 待转换数值
 * @param {number} base 目标进制
 * @description 根据输入的进制base，将目标数字转为对应进制的结果
 */
function decimalToBinary (decNumber: number, base: number): string {
  const remStack = new Stack<number>()
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let binaryString = ''

  if (!(base >= 2 && base <= 36)) {
    return ''
  }

  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }

  while (!remStack.isEmpty()) {
    // 将十进制转成十六进制时，余数是0～9加上A、B、C、D、E和F（对应10、11、12、13、14和15），需要对栈中的数字做个转化
    const popItem = remStack.pop()
    if (popItem) {
      binaryString += popItem
    }
  }
  return binaryString
}

console.log(decimalToBinary(100345, 35))

/**
 * @param {number} count 队列长度
 * @param {number} lowestCount 指向第一个元素（最先进入队列的元素）
 * @description 基于对象事项的队列
 */
class Queue<T> {
  count: number;
  lowestCount: number;
  private items: {[key: number]: T};
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 向队尾追加元素
  enqueue (element: T) {
    this.items[this.count] = element
    this.count++
  }

  // 移除元素 先进先出
  dequeue (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  // 查看队列头元素
  peek (): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  isEmpty (): boolean {
    return this.count - this.lowestCount === 0
  }

  size (): number {
    return this.count - this.lowestCount
  }

  clear () {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }
}

/**
 * 示例
 * @description 使用循环队列模拟击鼓传花游戏
 * @description 将参与者名单添加至队列中，给定一个数字迭代队列，从队列开头移除一项，再添加至队尾，循环结束时，从队头移除项被淘汰
 */
function hotPotato<T> (elementList: Array<T>, num: number): { eliminated: Array<T>, winner: T} {
  const queue = new Queue()
  const eliminatedList: Array<T> = []
  elementList.forEach(element => {
    queue.enqueue(element)
  })
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue() as T)
    }
    eliminatedList.push(queue.dequeue() as T)
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue() as T
  }
}

const names = ['John', 'Jack', 'Caf', 'Ingrid', 'Carl']
const result = hotPotato(names, 7)
result.eliminated.forEach(name => {
  console.log(`${name}在游戏中被淘汰`)
})
console.log(`胜利者：${result.winner}`)

/**
 * @description 基于对象实现的双向队列，同时遵循先进先出、后进先出的原则，栈和队列相结合的一种数据结构
 */

class Deque<T> {
  count: number;
  lowestCount: number;
  items: {[key: number]: T}
  constructor () {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 在双向队列前端添加元素
  addFront (element: T) {
    if (this.isEmpty()) {
      // 空队列，执行向队尾添加元素的方法
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      // lowestCount 大于0 表示已有元素从双向队列移除
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.lowestCount = 0
      this.items[0] = element
    }
  }

  // 在双向队列尾部添加元素
  addBack (element: T) {
    console.log(element)
  }

  isEmpty (): boolean {
    return this.count - this.lowestCount === 0
  }
}

/**
 * @description 链表
 * @param {class} Node 链表中的节点类
 * @param {function} equalsFn 自定义比较函数，比较两个js对象或值是否相等
 */
class Node<T> {
  element: T;
  next?: Node<T>
  // next?: Node<T>
  constructor (element: T) {
    this.element = element
    this.next = undefined
  }
}
function defaultEquals<T> (a: T, b: T) {
  return a === b
}
class LinkedList<T> {
  private count: number;
  private head?: Node<T>;
  private equalsFn: (a: T, b: T) => boolean;
  constructor (equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  // 向链表啊尾部添加一个元素
  push (element: T) {
    const node = new Node(element)
    let current
    if (!this.head) {
      this.head = node
    } else {
      current = this.head
      while (current.next != null) {
        current = current.next
      }
      // 将当前节点的next赋值为新元素，建立链接
      current.next = node
    }
    this.count++
  }

  // 获取链表中特定位置的元素
  getElementAt (index: number) {
    if (index < 0 || index > this.count) return undefined
    let node = this.head
    for (let i = 0; i < index && node; i++) {
      node = node.next
    }
    return node
  }

  // 移除给定位置的元素，区分移除第一个元素或是第一个以外的其他元素
  removeAt (index: number) {
    if (index < 0 || index >= this.count) return undefined
    let current = this.head
    if (!current) return undefined
    if (index === 0) {
      this.head = current.next
    } else {
      const previous = this.getElementAt(index - 1)
      if (!previous) return undefined
      current = previous.next
      if (!current) return undefined
      previous.next = current.next
    }
    this.count--
    return current.element
  }

  // 移除给定数据项的元素
  remove (element: T): T | undefined {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 返回所查找元素的位置
  indexOf (element: T): number {
    let current = this.head
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
}
</script>

<style scoped lang="scss"></style>
