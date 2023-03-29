<template>
    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-width="120px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.email" />
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)"
          >Delete</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
        <el-button @click="addDomain">New domain</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>

  <el-button text @click="dialogVisible = true">
    click to open the Dialog
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    draggable
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-button :plain="true" @click="openVn">VNode</el-button>
  </template>

<script lang="ts" setup>
import { reactive, ref, h } from 'vue'
import type { FormInstance, UploadProps, UploadUserFile, TabsPaneContext } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'

const openVn = () => {
  ElMessage({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: green' }, 'VNode123')
    ])
  })
}

const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      // done()
      dialogVisible.value = false
    })
    .catch(() => {
      // catch error
    })
}

const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const formRef = ref<FormInstance>()

interface DomainItem {
    key: number
    value: string
  }

const dynamicValidateForm = reactive<{
    domains: DomainItem[],
    email: string
}>({
  domains: [],
  email: ''
})

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item)
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1)
  }
}

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: ''
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  console.log('formEl', formEl)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const COLORS = {
  red: 'red',
  blue: 'blue'
}

type Colors = keyof typeof COLORS
const color: Colors = 'red'

</script>
