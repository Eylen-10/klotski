import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
console.log(ElementUI)
const app = createApp(App);
app.use(ElementUI)
app.mount('#app')
