<template>
  <div></div>
</template>

<script setup lang="ts">
class Node {
  data: any;
  next: Node | null;
  constructor (data = null, options: any = {}) {
    this.data = data
    // by default, each node will point to noting
    this.next = null
  }
}

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
      current = current.next
      if (counter === pos) {
        previous.next = current.next
        return true
      }
      counter++
    }
    return false
  }
}
</script>

<style scoped lang="scss"></style>
