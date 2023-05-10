<template>
  <div></div>
</template>

<script setup lang="ts">
class Node {
  data: any;
  next: Node | null;
  constructor (data: any = null, options: any = {}) {
    this.data = data
    // by default, each node will point to noting
    this.next = null
  }
}

// Single LinkedList
class LinkedList {
  header: Node;
  constructor () {
    this.header = new Node()
  }

  append (item: any) {
    let current = this.header
    const newNode = new Node(item)
    while (current.next != null) {
      current = current.next
    }
    current.next = newNode
    return true
  }

  appendAt (pos: number, item: any) {
    let counter = 0
    let current = this.header
    const newNode = new Node(item)
    while (current.next != null) {
      if (counter === pos) {
        newNode.next = current.next
        current.next = newNode
        return true
      }
      current = current.next
      counter++
    }
    return false
  }

  remove (item: any) {
    let current = this.header
    while (current.next !== null) {
      const previous = current
      current = current.next
      if (current.data === item) {
        previous.next = current.next
        return true
      }
    }
    return false
  }

  removeAt (pos: number, item: any) {
    let counter = 0
    let current = this.header
    while (current !== null) {
      const previous = current
      if (current.next) {
        current = current.next
      }
      if (counter === pos) {
        previous.next = current.next
        return true
      }
      counter++
    }
    return false
  }
}

/**
 * @param {number} count 栈长度
 * @description 基于数组的栈，时间复杂度为O(n)，n表示数组长度，即最坏情况下需要迭代整个数组直到找到所需元素，
 * @description 基于对象实现的栈，除了toString，其余方法复杂度均为O(1)
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

</script>

<style scoped lang="scss"></style>
