import Vue from 'vue';
import VueRouter from 'vue-router';
import itemList from '@/views/item-list.vue';

Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/:status?',
    name: 'item-list',
    component: itemList,
  }],
});

export default router;
