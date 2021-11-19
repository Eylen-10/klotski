import { createApp } from 'vue'
import App from './App.vue'
import ElementUI from 'element-plus';
import 'velocity-animate/velocity.min.js';
import 'element-plus/dist/index.css';
const app = createApp(App);
app.use(ElementUI)
app.mount('#app')
