<template>
  <div></div>
</template>

<script setup lang="ts">
import { NODE_EXPAND } from 'element-plus/es/components/tree-v2/src/virtual-tree'

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
  protected head?: Node<T>;
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

  insert (element: T, index: number): boolean {
    if (index < 0 || index > this.count) return false
    const node = new Node(element)
    if (index === 0) {
      const current = this.head
      node.next = current
      this.head = node
    } else {
      const previous = this.getElementAt(index - 1)
      if (!previous) return false
      const current = previous.next
      node.next = current
      previous.next = node
    }
    this.count++
    return true
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

  isEmpty (): boolean {
    return this.count === 0
  }

  size (): number {
    return this.count
  }
}

/**
 * @description 双向链表，可以使用interface的形式完整定义，也可以使用继承单向链表的形式重写部分方法
 * @description 双向链表中的节点包含指向前个、下个元素的指针
 */
class DoublyNode<T> extends Node<T> {
  prev?: DoublyNode<T>;
  constructor (element: T, next?: Node<T>, prev?: DoublyNode<T>) {
    super(element)
    this.prev = prev
  }
}
class DoublyLinkedList<T> extends LinkedList<T> {
  private tail?: DoublyNode<T> | undefined
  constructor (equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = undefined
  }
}

// interface ILinkedList<T> {
//   push(element: T): void;
//   insert(element: T, position: number): boolean;
//   getElementAt(index: number): DoublyNode<T> | undefined;
//   remove(element: T): T | undefined;
//   indexOf(element: T): number;
//   removeAt(position: number): T | undefined;
//   isEmpty(): boolean;
//   size(): number;
//   toString(): string;
// }

// class LinkedList<T> implements ILinkedList<T> {
//   protected count: number;
//   protected head: DoublyNode<T> | undefined;
//   protected tail: DoublyNode<T> | undefined;

//   constructor() {
//     this.count = 0;
//     this.head = undefined;
//     this.tail = undefined;
//   }

//   push(element: T): void {
//     const node = new DoublyNode(element, undefined, this.tail);
//     if (this.tail == null) {
//       this.head = node;
//       this.tail = node;
//     } else {
//       this.tail.next = node;
//       this.tail = node;
//     }
//     this.count++;
//   }

//   insert(element: T, position: number): boolean {
//     if (position >= 0 && position <= this.count) {
//       const node = new DoublyNode(element);
//       let current = this.head;
//       if (position === 0) {
//         if (this.head == null) {
//           this.head = node;
//           this.tail = node;
//         } else {
//           node.next = this.head;
//           current.prev = node;
//           this.head = node;
//         }
//       } else if (position === this.count) {
//         current = this.tail;
//         current.next = node;
//         node.prev = current;
//         this.tail = node;
//       } else {
//         const previous = this.getElementAt(position - 1);
//         current = previous.next;
//         node.next = current;
//         previous.next = node;
//         current.prev = node;
//         node.prev = previous;
//       }
//       this.count++;
//       return true;
//     }
//     return false;
//   }

//   getElementAt(index: number): DoublyNode<T> | undefined {
//     if (index >= 0 && index <= this.count) {
//       let node = this.head;
//       for (let i = 0; i < index && node != null; i++) {
//         node = node.next;
//       }
//       return node;
//     }
//     return undefined;
//   }

//   remove(element: T): T | undefined {
//     const index = this.indexOf(element);
//     return this.removeAt(index);
//   }

//   indexOf(element: T): number {
//     let current = this.head;
//     for (let i = 0; i < this.count && current != null; i++) {
//       if (element === current.element) {
//         return i;
//       }
//       current = current.next;
//     }
//     return -1;
//   }

//   需要分别处理在链表头、尾、中间移除节点的情况
//   removeAt(position: number): T | undefined {
//     if (position >= 0 && position < this.count) {
//       let current = this.head;
//       if (position === 0) {
//         this.head = current.next;
//         if (this.count === 1) {
//           this.tail = undefined;
//         } else {
//           this.head.prev = undefined;
//         }
//       } else if (position === this.count - 1) {
//         current = this.tail;
//         this.tail = current.prev;
//         this.tail.next = undefined;
//       } else {
//         current = this.getElementAt(position);
//         const previous = current.prev;
//         previous.next = current.next;
//         current.next.prev = previous;
//       }
//       this.count--;
//       return current.element;
//     }
//     return undefined;
//   }

//   isEmpty(): boolean {
//     return this.count === 0;
//   }

//   size(): number {
//     return this.count;
//   }

//   toString(): string {
//     if (this.head == null) {
//       return '';
//     }
//     let objString = `${this.head.element}`;
//     let current = this.head.next;
//     for (let i = 1; i < this.size() && current != null; i++) {
//       objString = `${objString},${current.element}`;
//       current = current.next;
//     }
//     return objString;
//   }
// }

/**
 * @description 有序链表
 */
enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1
}

type CompareFn<T> = (a: T, b: T) => number;

// 比较两个元素
function defaultCompare<T> (a: T, b: T): number {
  if (a === b) return 0
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

class SortedLinkedList<T> extends LinkedList<T> {
  public compareFn: CompareFn<T>
  // constructor中传参的两种写法，equalsFn设置默认值，不需要再声明为可选参数，compareFn声明为可选参数则需要在初始化中设置this.compareFn赋值的默认值
  constructor (equalsFn = defaultEquals, compareFn?: CompareFn<T>) {
    super(equalsFn)
    this.compareFn = compareFn || defaultCompare
  }

  // 重写insert方法
  insert (element: T, index = 0): boolean {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    const pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }

  getIndexNextSortedElement (element: T): number {
    let current = this.head
    let i = 0
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return i
  }
}

/**
 * @description 二叉搜索树（BST），二叉树的一种，左侧只存比父节点小的值，右侧村比父节点大的值
 */

/**
 * @description 定义二叉树节点
 * @param left {@link T} 左侧子节点
 * @param right {@link T} 右侧子节点
 */
interface IBiTNode<T> {
  key: T;
  left: IBiTNode<T> | null;
  right: IBiTNode<T> | null;
}

class BiTNode<T> implements IBiTNode<T> {
  key: T;
  left: IBiTNode<T> | null;
  right: IBiTNode<T> | null
  constructor (key: T) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree<T> {
  root: BiTNode<T> | null;
  public compareFn: CompareFn<T>;
  constructor (compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  // 插入新的键（节点）
  insert (key: T) {
    if (this.root == null) {
      this.root = new BiTNode<T>(key)
      return this
    }
    this.insertNode(this.root, key)
    return this
  }

  // 通过递归的形式，在父节点中插入新节点（满足左侧节点值比父节点小，右侧节点值比父节点大）
  insertNode (node: BiTNode<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new BiTNode<T>(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right == null) {
        node.right = new BiTNode<T>(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  // 查找树中的某个键（节点）
  // search (key) {}

  // 中序遍历树中所有节点
  // 按从小到大的顺序访问所有节点，常用于对树进行排序
  inOrderTraverse (callback?: (key: T) => void) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode (node: BiTNode<T> | null, callback?: (key: T) => void) {
    if (!node) return
    this.inOrderTraverseNode(node.left, callback)
    callback && callback(node.key)
    this.inOrderTraverseNode(node.right, callback)
  }

  // 先序遍历树中的所有节点
  // 优先于后代节点的顺序访问每个节点，常用于打印结构化文档
  preOrderTraverse (callback?: (key: T) => void) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode (node: BiTNode<T> | null, callback?: (key: T) => void) {
    if (!node) return
    callback && callback(node.key)
    this.preOrderTraverseNode(node.left, callback)
    this.preOrderTraverseNode(node.right, callback)
  }

  // 后序遍历树中的所有节点
  // 优先访问节点的后代节点，再访问节点本身，常用于计算一个目录及其子目录所有文件占空间的大小
  postOrderTraverse (callback?: (key: T) => void) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode (node: BiTNode<T> | null, callback?: (key: T) => void) {
    if (!node) return
    this.postOrderTraverseNode(node?.left, callback)
    this.postOrderTraverseNode(node.right, callback)
    callback && callback(node.key)
  }

  // 返回二叉搜索树中最小的键（节点）
  // 即最左侧叶节点
  min () {
    return this.minNode(this.root)
  }

  minNode (node: BiTNode<T> | null) {
    let current = node
    while (current && current.left) {
      current = current.left
    }
    return current
  }

  // 返回二叉搜索树中最大的键（节点）
  // 即最右侧叶节点
  max () {
    return this.maxNode(this.root)
  }

  maxNode (node: BiTNode<T> | null) {
    let current = node
    while (current && current.right) {
      current = current.right
    }
    return current
  }

  // 搜索是否包含一个特定的值
  search (key: T) {
    return this.searchNode(this.root, key)
  }

  searchNode (node: BiTNode<T> | null, key: T): boolean {
    if (!node) return false
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 移除树中某个节点
  remove (key: T) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode (node: BiTNode<T> | null, key: T): BiTNode<T> | null {
    if (!node) return null
    // 通过遍历在树中找到需要移除的节点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      // 查询到了需要移除的节点（建和node.key相同）
      // 情况一：删除没有左、右子树的叶节点，将节点置为null进行移除，并通过返回节点自身（null）处理父节点指针
      if (!node.left && !node.right) {
        node = null
        return node
      }
      // 情况二：仅包含左子树或右子树的节点，更新节点指向其子节点，并返回更新后的节点修改其父节点的指针
      if (node.left == null) {
        node = node.right
        return node
      } else if (node.right == null) {
        node = node.left
        return node
      }
      // 情况三：移除同事包含两个子节点的节点
      // 查询该节点右子树中键最小的节点，使用最小节点的键更新该节点的值，同时移除该最小值得节点，返回更新后得节点更新其父节点得指针
      const aux = this.minNode(node.right) as BiTNode<T>
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}

const tree = new BinarySearchTree<number>()
tree.insert(11).insert(25).insert(30).insert(10).insert(40)
const printNode = (value: number) => console.log(`--${value}--`)
tree.inOrderTraverse(printNode)
console.log('=====')
// tree.preOrderTraverse(printNode)

tree.remove(20)
tree.preOrderTraverse(printNode)

/**
 * @description AVL树（Adelson-Velskii-Landi树）平衡二叉树
 * @description AVL树，其左子树、右子树均为平衡二叉树，任何一个节点左右子树的深度之差最多为1，添加或移除节点时，AVL树会尽可能尝试转为完全树，优化节点搜索时的性能问题
 * @description 节点（结点）的平衡因子：该节点左子树的深度减去右子树深度的值（-1，0，1）
 */
enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5
}
class AVLTree<T> extends BinarySearchTree<T> {
  constructor (compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  // 此处节点（结点）高度的定义：该节点到其任意子节点的边的最大值
  getNodeHeight (node: BiTNode<T> | null): number {
    if (node == null) {
      return -1
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  // 计算节点平衡因子
  getBalanceFactor (node: BiTNode<T>) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  // 添加、删除节点后，计算节点的高度并验证是否需要平衡
  // LL：向右单旋转 RR：向左单旋转 LR：向右双旋转（先LL旋转，再RR旋转）RL：向左双旋转（先RR旋转，再LL旋转）
  rotationLL (node: BiTNode<T>) {
    const temp = node.left
    if (!temp) return null
    node.left = temp.right
    temp.right = node
    return temp
  }
}

/**
 * @description 红黑树 一种平衡二叉树
 * @description AVL树在插入、移除节点时会造成旋转，AVL树适用插入、删除节点频率低的场景；JDK的集合类TreeMap、TreeSet的底层使用红黑树实现，Java8中HashMap也用到了红黑树;
 * @description 红黑树规则：1.每个节点为红色或者黑色 2.根节点为黑色 3.所有叶节点为黑色 4.红色节点的两个子节点均为黑色 5.不能存在相邻的红节点 6.从给定节点到其后代节点（叶节点）所有路径包含相同数量的黑色节点
 */
enum Colors {
  RED = 'red',
  BLACK = 'black',
}
class RedBlackNode<T> extends BiTNode<T> {
  color: string
  parent: RedBlackNode<T> | null
  left: RedBlackNode<T> | null
  right: RedBlackNode<T> | null
  constructor (key: T) {
    super(key)
    this.key = key
    this.color = Colors.RED
    this.parent = null
    this.left = null
    this.right = null
  }

  isRed () {
    return this.color === Colors.RED
  }
}

class RedBlackTree<T> extends BinarySearchTree<T> {
  root: RedBlackNode<T> | null // add type annotation for root property

  constructor (compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  // 如果为空树，插入为根节点，并置为黑色
  // 新插入节点默认为红色
  insert (key: T) {
    if (this.root == null) {
      this.root = new RedBlackNode<T>(key)
      this.root.color = Colors.BLACK
      return this
    } else {
      // 查询节点插入的位置，插入成功后返回新节点并验证是否满足红黑树规则
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
      return this
    }
  }

  // 重写insert方法
  // 分别遍历左、右子树，在合适位置插入新节点，并返回新插入节点校验是否满足红黑树规则
  insertNode (node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    } else if (node.right == null) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    } else {
      return this.insertNode(node.right, key)
    }
  }

  // 新插入节点为红色，需要根据规则5、6进行调整
  // 新插入节点的父节点为黑色不需调整，如果父节点为红色，则要同时调整父节点，父节点的兄弟节点以及祖父节点
  fixTreeProperties (node: RedBlackNode<T>): void {
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) {
      let parent = node.parent
      const grandParent = parent.parent

      // case A: parent is left child of grandparent
      // 情形A：节点的父节点是其祖父节点的左侧子节点
      if (grandParent && grandParent.left === parent) {
        const uncle = grandParent.right

        // case 1: uncle is also red - only recoloring
        // 情形A1：节点的叔节点也为红色，只需要重新填色
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          // 将当前节点的引用指向祖父节点，继续检查祖父节点和其他关联的节点是否有冲突
          node = grandParent
        } else {
        // case 2: node is right child - left rotate
        // 情形A2：节点是其父节点的右侧子节点，进行左旋转
          if (node === parent.right) {
            this.rotationLeft(parent)
            node = parent
            if (node.parent) {
              parent = node.parent
            }
          }

          // case 3: node is left child - right rotate
          // 情形A3：节点是其父节点的左侧子节点，进行右旋转
          this.rotationRight(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      } else { // case B: parent is right child of grandparent
        const uncle = grandParent && grandParent.left

        // case 1: uncle is also red - only recoloring
        if (uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        } else {
        // case 2: node is left child - right rotate
        // 情形B2：节点是其父节点的左侧子节点，进行左旋转
          if (node === parent.left) {
            this.rotationRight(parent)
            node = parent
            if (node.parent) {
              parent = node.parent
            }
          }

          // case 3: node is right child - left rotate
          // 情形B3：节点是其父节点的右侧子节点，进行左旋转
          if (grandParent) {
            this.rotationLeft(grandParent)
            grandParent.color = Colors.RED
          }
          parent.color = Colors.BLACK
        }
      }
    }

    // ensure root is black
    if (this.root) {
      this.root.color = Colors.BLACK
    }
  }

  // 向右单旋转 rotationLL
  rotationRight (node: RedBlackNode<T>) {
    const temp = node.left
    if (!temp) return
    // 旋转时，需要同时修改子节点指针以及父节点指针
    node.left = temp.right
    if (temp.right && temp.right.key) {
      temp.right.parent = node
    }
    temp.parent = node.parent
    if (!node.parent) {
      this.root = temp
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    }
    // 修改完temp和node父节点的指针后，再修改temp和node的关联指针
    temp.right = node
    node.parent = temp
  }

  // 向左单旋转 rotationRR
  rotationLeft (node: RedBlackNode<T>) {
    const temp = node.right
    if (!temp) return
    node.right = temp.left
    if (temp.left && temp.left.key) {
      temp.left.parent = node
    }
    temp.parent = node.parent
    if (!node.parent) {
      this.root = temp
    } else {
      if (node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    }
    temp.left = node
    node.parent = temp
  }
}

const redNode = new RedBlackNode('123')
redNode.color = '123'
console.log('redNode', redNode)
</script>

<style scoped lang="scss"></style>
