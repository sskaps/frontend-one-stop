<template>
  <el-dropdown @command="onMenuClick">
    <a class="indexlayout-top-usermenu" @click="e => e.preventDefault()">
      <i class="el-icon-circle-plus font-18"></i>
    </a>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="demand">
          {{t('index-layout.topmenu.demand')}}
        </el-dropdown-item>
        <el-dropdown-item command="project">
          {{t('index-layout.topmenu.project')}}
        </el-dropdown-item>
        <el-dropdown-item command="feedback">
          {{t('index-layout.topmenu.feedback')}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-dialog v-model="dialogVisible"
             title="新建项目"
             width="600px"
             destroy-on-close>
    <add-project ref="projectRef" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeDialogStatus(false)">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
  import {computed, defineComponent, ComputedRef, ref, Ref} from "vue";
  import {useStore} from "vuex";
  import {useRouter} from "vue-router";
  import {useI18n} from "vue-i18n";
  import {StateType as UserStateType, CurrentUser} from "@/store/user";
  import useDialog from '@/composables/useDialog';
  import AddProject from './AddProject.vue';

  interface RightTopUserSetupData {
    t: (key: string | number) => string;
    currentUser: ComputedRef<CurrentUser>;
    onMenuClick: (event: any) => Promise<void>;
    dialogVisible: Ref<boolean>;
    projectRef: Ref<typeof AddProject | undefined>;
    changeDialogStatus: (visible: boolean) => void;
    submitForm: () => void;
  }

  export default defineComponent({
    name: 'RightTopOperate',
    components: {
      AddProject
    },
    setup(): RightTopUserSetupData {
      const {dialogVisible, changeDialogStatus} = useDialog();
      const store = useStore<{ user: UserStateType }>();
      const router = useRouter();
      const {t} = useI18n();


      // 获取当前登录用户信息
      const currentUser = computed<CurrentUser>(() => store.state.user.currentUser);

      // 点击菜单
      const onMenuClick = async (command: string) => {
        changeDialogStatus(true);
        if (command === 'project') {}
      };

      const projectRef = ref<typeof AddProject>(AddProject);
      const submitForm = () => {
        projectRef.value?.handleSubmit((valid: boolean, result: object) => {
          if (valid) {
            changeDialogStatus(false);
          }
        });
      };
      return {
        t,
        currentUser,
        onMenuClick,
        dialogVisible,
        projectRef,
        changeDialogStatus,
        submitForm
      }
    }
  })
</script>
