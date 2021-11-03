import {createApp} from 'vue';

// 样式初始化
import 'normalize.css';

// 全局样式
import '@/assets/css/global.scss';

// 引入 ElementUI
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
// import '@element-plus/icons'

// 导入 svg
import {importAllSvg} from "@/components/IconSvg";

importAllSvg();

import App from '@/App.vue';
import router from '@/config/routes';
import store from '@/config/store';
import i18n from '@/config/i18n';

export const app = createApp(App)
app.use(ElementPlus, {size: 'small'});
app.use(router).use(store).use(i18n).mount('#app');

