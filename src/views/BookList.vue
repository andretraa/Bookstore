<template>
  <div>
    <v-container grid-list-md>
      <v-subheader class="text-h6">
        All Books
        <v-spacer></v-spacer>
      </v-subheader>

      <v-layout row wrap>
        <v-flex xs12 md4 xl4 v-for="book in books" :key="book.id">
          <v-card
            :loading="loading"
            class="mx-auto my-4"
            max-width="374"
            :to="'/book/' + book.slug"
          >
            <template v-slot:loader="{ isActive }">
              <v-progress-linear
                :active="isActive"
                color="deep-purple"
                height="4"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              cover
              :src="getImage('/books/' + book.cover)" height="250px"
            ></v-img>

            <v-card-item>
              <v-card-title>{{ book.title }}</v-card-title>

              <v-card-subtitle>
                <span class="me-1">Author - {{ book.author }}</span>

                <v-icon
                  color="error"
                  icon="mdi-fire-circle"
                  size="small"
                ></v-icon>
              </v-card-subtitle>
            </v-card-item>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
              <div class="text-grey">
                Berat ({{book.weight}} kg)
              </div>
            </v-row>
            <v-row
                align="center"
                class="mx-0"
              >
              <div class="text-grey">
                Stock ({{book.stock}})
              </div>
            </v-row>
            <v-row
                align="center"
                class="mx-0"
              >
              <div class="text-grey">
                Publisher - {{ book.publisher }}
              </div>
            </v-row>


            </v-card-text>

            <v-divider class="mx-4 "></v-divider>

            <v-card-title>Price : Rp {{ book.price }}</v-card-title>

            <v-card-actions>
              <v-btn
                color="deep-purple-lighten-2 ms-2 mb-2"
                variant="text"
                @click="reserve"
              >
                Add To Cart
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <template>
      <v-pagination
        :length="lengthPage"
        @input="go"
        v-model="page"
        :total-visible="4"
      ></v-pagination>
    </template>
  </div>
</template>

<!-- <template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-item>
      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-subtitle>
        <span class="me-1">Local Favorite</span>

        <v-icon
          color="error"
          icon="mdi-fire-circle"
          size="small"
        ></v-icon>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="4.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn
        color="deep-purple-lighten-2"
        variant="text"
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template> -->

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      page: 0,
      lengthPage: 0,
      loading: false,
      selection: 1,
    };
    
  },
  methods: {
    go() {
      let url = "/books";
      if (this.page > 0) {
        url = "/books?page=" + this.page;
      }
      axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/api/v1`+ url)
      .then((response) => {
        // let response_data = response.data;
        //   let categories = response_data.data;
        let books = response.data.data.data
        this.lengthPage = response.data.data.last_page
        this.books = books
        console.log(books, 'data')
      })
      .catch((error) => {
        let response = error.response
        console.log(response)
      })
        .catch((error) => {
          let response = error.response;
          console.log(response);
        });
    },

    getImage(image) {
      if (image != null && image.length > 0) {
        const prefix = process.env.VUE_APP_BACKEND_URL.replace("/api/v1", "");
        return `${prefix}/storage/images/${image}`;
      }
      return "/img/unvaliable.jpg";
    },
    reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
  },
  created() {
    this.go();
  },
};
</script>

<style scoped>
.text-block {
  position: absolute;
  bottom: 5px;
  left: 5px;
  background-color: black;
  padding-left: 5px;
  padding-right: 5px;
  opacity: 0.7;
  width: 100%;
}
</style>
