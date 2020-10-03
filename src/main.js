import Vue from 'vue';
import Router from 'vue-router';
import {
  Input,
  Button,
  Form,
  FormItem,
  Message,
  MessageBox,
} from 'element-ui';
import routes from './router';
import store from './store';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router);
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false;
const router = new Router({
  routes,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
