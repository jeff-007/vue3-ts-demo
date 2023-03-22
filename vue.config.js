const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 按需引入element plus需要在这里进行webpack配置
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     plugins: [
//       AutoImport({
//         resolvers: [ElementPlusResolver()]
//       }),
//       Components({
//         resolvers: [ElementPlusResolver()]
//       })
//     ]
//   }
// })
