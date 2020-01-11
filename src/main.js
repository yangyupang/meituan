import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from "./http"
import dayjs from 'dayjs'
import VueRouter from 'vue-router';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import api from './http/api'

Vue.use(VueRouter);
Vue.use(ViewUI);


Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')