<template>
  <v-footer dark height="auto" color="primary">
    <v-flex xs12>

      <v-card text tile class="white--text text-xs-center" color="primary">

        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 my-2 white--text" icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-layout justify-center row wrap>

          <v-btn v-for="link in links" :key="link" color="white" text >
            {{ link }}
          </v-btn>

          <v-flex xs12 py-3 white--text color="primary">
            {{ new Date().getFullYear() }} — Bookstore <strong>Vuetify</strong>
          </v-flex>
        </v-layout>

      </v-card>

    </v-flex>
  </v-footer>
</template>


<script>
    export default {
        data: () => ({
            icons: [
              'mdi-facebook-messenger',
              'mdi-whatsapp',
              'mdi-linkedin',
              'mdi-instagram',
              'mdi-cart',
            ],

            links: [
                'Home',
                'About Us',
                'Team',
                'Services',
                'Blog',
                'Contact Us',
            ]
        })
    }
</script>