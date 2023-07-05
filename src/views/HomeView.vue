<template>
  <div>
    <v-container grid-list-md>
        <v-subheader class="text-h6">
          Random Category
          <v-spacer></v-spacer>

          <router-link to="/categories">See All</router-link>
        </v-subheader>

        <v-layout row wrap>
          <v-flex xs6 v-for="category in categories" :key="category.id">
            <v-card :to="'/category/'+ category.slug">
              <v-img
              :src="getImage('/categories/' + category.image)"
              height="250px"
              >
                <v-container fill-height fluid pa-2>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="title white--text text-block" v-text="category.name"></span>
                    </v-flex>
                    
                  </v-layout>
                </v-container>
              </v-img>

              <v-card-actions>
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

    <v-container grid-list-md>
      <v-subheader class="text-h6">Top Books
        <v-spacer></v-spacer>
        <router-link to="/books">See All</router-link>
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
  </div>
</template>

<script>

  import axios from 'axios';

  export default {
    data: () => ({
      categories: [],
      books: []    
    }),
    methods: {
      getImage (image) {
        if (image != null && image.length>0) {
          const prefix =  process.env.VUE_APP_BACKEND_URL.replace('/api/v1', '')
          return `${prefix}/storage/images/${image}`
        }
        return "/img/unvaliable.jpg"
      },
    },
    created(){
      let count = 4
      axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/categories/random/`+ count)
      .then((response) => {
        let categories = response.data.data
        this.categories = categories;
        console.log(this.categories);
      })
      .catch((error) => {
        let response = error.response
        console.log(response)
      })

      count = 8
      console.log(process.env.VUE_APP_BACKEND_URL, 'data')
      axios
      .get(`${process.env.VUE_APP_BACKEND_URL}/books/top/`+ count)
      .then((response) => {
        let books = response.data.data
        this.books = books
        console.log(this.books)
      })
      .catch((error) => {
        let response = error.response
        console.log(response)
      })

    }
  }
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