<template>
    <v-navigation-drawer v-model="drawer" absolute fixed clipped>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="drawer=false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-app-bar-title>Bookstore</v-app-bar-title>
        </v-toolbar>
        <v-list>
            <v-list-item>
                <v-btn depressed block rounded color="secondary" class="text--white">
                    Register <v-icon right dark>mdi-account</v-icon>
                </v-btn>
            </v-list-item>
            <v-list-item>
                <v-btn depressed block rounded color="secondary" class="text--white">
                    Login <v-icon right dark>mdi-lock-open</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>
        <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-item v-for="(item,index) in items" :key="index" :href="item.route" :to="{name :item.route}">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>    
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'c-side-bar',
  data: () => ({
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', route: 'HomePage' },
      { title: 'About', icon: 'mdi-alert-circle', route: 'about' },
    ]
  }),
  computed: {
    ...mapGetters(['sideBar']), // Map the 'sideBar' getter from the Vuex store
    drawer: {
      get() {
        return this.sideBar;
      },
      set(value) {
        this.setSideBar(value); // Call the 'setSideBar' action from the Vuex store
      }
    },
  },
  methods: {
    ...mapActions(['setSideBar']), // Map the 'setSideBar' action from the Vuex store
  },
};
</script>
