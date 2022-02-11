import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '@/pages/about.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
