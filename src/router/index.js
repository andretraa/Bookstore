import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CategoryList from "../views/CategoryList.vue";
import store from "../store"


Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView
        },
        {
          path: '/categories',
          name: 'categories',
          component: CategoryList
        },
        {
          path: '/category/:slug',
          name: 'category',
          component: () => import('../views/BookCategory.vue')
        },
        {
          path: '/books',
          name: 'books',
          component: () => import('../views/BookList.vue')
        },
        {
          path: '/book/:slug',
          name: 'book',
          component: () => import('../views/BookDetail.vue')
        },
        {
          path: '/checkout',
          name: 'checkoutPage',
          component: () => import('../views/CheckoutPage.vue'),
          meta: { auth: true }
        },
        {
          path: '/payment',
          name: 'PaymentPage',
          component: () => import('../views/PaymentPage.vue'),
          meta: { auth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfilePage.vue'),
          meta: { auth: true }
        },
        {
          path: '/my-order',
          name: 'my-order',
          component: () => import('../components/MyOrder.vue'),
          meta: { auth: true }
        },
  ],

})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if(store.getters['auth/guest']) {
      store.dispatch('alert/set', {
        status: true,
        text: 'Login First',
        color: 'error',
      })
      store.dispatch('setPrevUrl', to.path)

      store.dispatch('dialog/setComponent', 'login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
