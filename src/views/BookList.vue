<template>
  <div>
    <v-container grid-list-md>
      <v-subheader>
        All Books
        <v-spacer></v-spacer>
      </v-subheader>

      <v-layout row wrap>
        <v-flex xs6 v-for="book in books" :key="book.id">
          <v-card :to="'/book/' + book.slug">
            <v-img :src="getImage('/books/' + book.cover)" height="250px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span
                      class="title white--text text-block"
                      v-text="book.title"
                    ></span>
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

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      page: 0,
      lengthPage: 0,
    };
  },
  methods: {
    go() {
      let url = "/books";
      if (this.page > 0) {
        url = "books?page=" + this.page;
      }
      axios
      .get(`${process.env.VUE_APP_BACKEND_URL}`+ url)
      .then((response) => {
        // let response_data = response.data;
        //   let categories = response_data.data;
        let books = response.data.data.data
        this.lengthPage = response.data.data.last_page
        this.books = books
        console.log(this.lengthPage, 'data')
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
