import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/hoteis',
      name: 'Hoteis',
      component: () => import('./views/Hoteis.vue')

    },
    {
      path: '/rooms',
      name: 'Rooms',
      component: () => import('./views/Rooms.vue')
    },
    {
      path: '/Hotel/:idHotel',
      name: 'Hotel',
      component: () => import( './views/Hotel.vue')
    },
    {
      path: '/Room/:idRoom',
      name: 'Room',
      component: () => import('./views/Room.vue')
    }
  ]
});

