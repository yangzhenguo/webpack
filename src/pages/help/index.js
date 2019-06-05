/**
 * Created by Sam on 2019/6/1.
 */
import Vue from 'vue';
import { Tag } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './components/App.vue';

Vue.use(Tag);

new Vue({
    el: '#app',
    render: h => h(App)
});