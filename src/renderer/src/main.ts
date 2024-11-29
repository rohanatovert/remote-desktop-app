import { createApp } from 'vue';
import App from './App.vue';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App);
app.use(ElMessage);
app.mount('#app');
