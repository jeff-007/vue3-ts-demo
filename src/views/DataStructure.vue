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

// 示例
/**
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
 * @description 基于对象事项的队列
 * @param {number} count 队列长度
 * @param {number} lowestCount 指向第一个元素（最先进入队列的元素）
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
</script>

<style scoped lang="scss"></style>
