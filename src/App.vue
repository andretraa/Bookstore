<template>
  <v-app>
    <!-- header -->
    <c-header />
    <!-- sidebar -->
    <c-side-bar />
    <c-alert />
    <v-dialog
      v-model="dialog"
      scrollable fullscreen 
      hide-overlay
      transition="dialog-transition"
    >
      <search-view/>
    </v-dialog>

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
import Search from '@/views/SearchView.vue'

export default {
  name: 'App',
  components: {
    CHeader,
    CSideBar,
    CFooter,
    CAlert,
    Search,
  },
  data: () => ({
    //
  }),
};
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