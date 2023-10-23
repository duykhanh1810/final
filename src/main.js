import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Import the router instance
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import HighchartsVue from 'highcharts-vue';

import './main.css';


const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router);
app.use(HighchartsVue);
app.mount('#app');
