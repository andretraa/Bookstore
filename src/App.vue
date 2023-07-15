<template>
  <v-app>
    <!-- header -->
    <c-header />
    <!-- sidebar -->
    <c-side-bar />
    <c-alert />

    <keep-alive>
      <v-dialog
        v-model="dialog"
        fullscreen hide-overlay
        transition="dialogbottom-transition"
      >
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>

    <v-main>
      <router-view/>
    </v-main>

    <!-- footer -->
    <c-footer />
  </v-app>
</template>

<script>
import CHeader from '@/components/CHeader.vue'
import CSideBar from '@/components/CSideBar.vue'
import CFooter from '@/components/CFooter.vue'
import CAlert from '@/components/CAlert.vue'
import MyOrder from '@/components/MyOrder.vue'
import SearchPage from '@/views/SearchPage.vue'
import Checkout from '@/views/CheckoutPage.vue'
import Cart from '@/views/CartPage.vue'
import login from '@/views/LoginPage.vue'
import register from '@/views/RegisterPage.vue'
import PaymentPage from '@/views/PaymentPage.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    CHeader,
    CFooter,
    CSideBar,
    CAlert,
    SearchPage,
    Cart,
    Checkout,
    login,
    register,
    MyOrder,
    PaymentPage,
  },
  methods:{
    ...mapActions({
      setStatusDialog : 'dialog/setStatus',
    }),
  },
  computed: {
    ...mapGetters({
      statusDialog : 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get (){
        return this.statusDialog
      },
      set (value){
        this.setStatusDialog(value)
      }
    },
  },
}
</script>

<style type="text/css">
  .v-toolbar {
    flex: 0 !important;
  }

  .v-application .py-3 {
    text-align: center !important;
  }
  .v-card__text {
    text-align: center !important;
  }

</style>