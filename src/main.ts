import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入elements plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// .mount() 方法应该始终在整个应用配置和资源注册完成后被调用
// 不同于其他资源注册方法，.mount()返回值是根组件实例而非应用实例
const rootApp = createApp(App)
rootApp.use(store).use(router).use(ElementPlus).mount('#app')

// getGlobalName('HELLO WORLD')
// jQuery('#app')

// jQuery('#app')

// const cat = new Animal('Tom')
// console.log(cat)

const settings: Jye.Info = {
  name: 'Animal',
  age: '30'
}

// Jye.getAge()
