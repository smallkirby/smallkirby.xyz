import Vue from 'vue';
import VueRouter from 'vue-router';
import About from '@/pages/about.vue';
import Dislikes from '@/pages/dislikes.vue';
import Likes from '@/pages/likes.vue';
import Nirugiri from '@/pages/nirugiri.vue';
import Pronunciation from '@/pages/pronunciation.vue';
import Shmug from '@/pages/shmug.vue';
import Sotsuron from '@/pages/sotsuron.vue';
import Tools from '@/pages/tools.vue';
import Trash from '@/pages/trash.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/dislikes',
    name: 'dislikes',
    component: Dislikes,
  },
  {
    path: '/likes',
    name: 'likes',
    component: Likes,
  },
  {
    path: '/nirugiri',
    name: 'nirugiri',
    component: Nirugiri,
  },
  {
    path: '/pronunciation',
    name: 'pronunciation',
    component: Pronunciation,
  },
  {
    path: '/shmug',
    name: 'shmug',
    component: Shmug,
  },
  {
    path: '/sotsuron',
    name: 'sotsuron',
    component: Sotsuron,
  },
  {
    path: '/tools',
    name: 'tools',
    component: Tools,
  },
  {
    path: '/trash',
    name: 'trash',
    component: Trash,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
