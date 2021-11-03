/**
 * 设置 dialog status  composables
 * @author kerong
 */
import { ref, Ref } from 'vue';

export default function useDialog(): {
  dialogVisible: Ref<boolean>;
  changeDialogStatus: (visible: boolean) => void;
} {
  const dialogVisible = ref<boolean>(false);
  const changeDialogStatus = (visible: boolean = false) => {
    dialogVisible.value = visible;
  };
  return {
    dialogVisible,
    changeDialogStatus
  };
}
