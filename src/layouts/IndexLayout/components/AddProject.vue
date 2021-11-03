<template>
  <el-form ref="formRef" :model="projectInfo" :rules="rules" label-width="100px" label-position="left">
    <el-form-item label="项目名称" prop="projectName">
      <el-input v-model="projectInfo.projectName" placeholder="请输入项目名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="项目类型" prop="projectType">
      <el-select v-model="projectInfo.projectType" clearable style="width: 100%;">
        <el-option v-for="project in projectTypes" :label="project.label" :value="project.value">{{project.label}}</el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目描述" prop="projectDesc">
      <el-input
        v-model="projectInfo.projectDesc"
        maxlength="200"
        placeholder="请输入项目描述信息"
        show-word-limit
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
  import {defineComponent, ComputedRef, ref, Ref, reactive} from "vue";
  import {ElForm} from 'element-plus';

  interface ProjectType {
    value: string;
    label: string;
  }

  interface AddProject {
    t?: (key: string | number) => string;
    formRef: Ref<typeof ElForm | undefined>;
    projectInfo: any;
    rules: object;
    projectTypes: ProjectType[];
    handleSubmit: (cb: (valid: boolean, result: object) => void) => void;
    handleReset: () => void;
  }

  export default defineComponent({
    name: 'AddProject',
    setup(): AddProject {
      const projectInfo = reactive({
        projectName: '',
        projectType: 'project',
        projectDesc: ''
      });
      const projectTypes = reactive<ProjectType[]>([
        {
          value: 'project',
          label: '项目'
        },
        {
          value: 'components',
          label: '组件库'
        }
      ]);
      const rules = {
        projectName: [
          {required: true, message: '项目名称不能为空', trigger: 'blue'}
        ],
        projectType: [
          {required: true, message: '项目类型不能为空', trigger: 'change'}
        ]
      };

      const formRef = ref<typeof ElForm>();
      const handleSubmit = async (cb: (valid: boolean, result: object) => void) => {
        formRef.value?.validate((valid: boolean, result: Object) => cb(valid, result))
      };
      const handleReset = () => {
        formRef.value?.resetFields();
      };

      return {
        formRef,
        projectInfo,
        rules,
        projectTypes,
        handleSubmit,
        handleReset
      }
    }
  })
</script>
