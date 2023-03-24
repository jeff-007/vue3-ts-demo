<template>
  <div class="login-wrap">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="login-box">
      <el-form-item label="账号" prop="userName">
        <el-input v-model="ruleForm.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item class="operate-box">
        <el-button type="primary">{{ PostStatus[0] }}</el-button>
        <el-button>Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup () {
    enum PostStatus {
      Draft = 0,
      Unpublished,
      Published
    }
    const data = reactive({
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '账号长度最多不超过10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '密码长度最多不超过10个字符', trigger: 'blur' }
        ]
      },
      PostStatus: PostStatus
    })

    // 泛型类
    interface GenericInterface<U> {
      value: U;
      getIdentity: (args: Array<U>) => Array<U>
    }

    class IdentityClass<T> implements GenericInterface<T> {
      value: T;
      constructor (value: T) {
        this.value = value
      }

      getIdentity (source: T[]): Array<T> {
        return source.splice(0, source.length - 1)
      }
    }

    const myNumberClass = new IdentityClass<number>(60)
    console.log(myNumberClass.getIdentity([1, 2, 2, 5]))

    interface Person {
      name: string;
      age: number;
      location: string;
    }

    interface player {
      [name: string]: Person;
    }

    const playerOne: player = {
      config: {
        name: 'jefferson',
        age: 10,
        location: 'space in universe'
      }
    }

    const playerThree: player = {
      config: {
        name: 'lucas',
        age: 10,
        location: '9th universe avenues'
      }
    }

    function mergeAge (args: player) {
      for (const key in args) {
        console.log(key)
      }
    }

    const playerMerge = { ...playerOne, ...playerThree }
    mergeAge(playerMerge)

    console.log('playerOne', playerOne)

    return { ...toRefs(data) }
  }
})
</script>

<style scoped lang="scss">
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../assets/loginBg.png') no-repeat center;
  background-size: cover;

  .login-box {
    width: 400px;
    height: 200px;
    padding: 32px;
    box-sizing: border-box;
    background: rgba(9, 41, 68, 0.6);
    border-radius: 20px;
    box-shadow: 0 2px 8px 4px rgba(82, 82, 82, 0.15);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .operate-box {
      :deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
}
</style>
