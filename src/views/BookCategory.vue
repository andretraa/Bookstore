<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>{{ category.name }}</v-subheader>
            <v-img v-if="category.image" :src="getImage('/categories/' + category.image)" height="150px"></v-img>
            <v-subheader>Books by "{{ category.name }}" category"</v-subheader>
            <v-layout row wrap>
                <v-flex xs6 v-for="book in books" :key="book.id">
                    <v-card :to="'/book/' + book.slug">
                        <v-img :src="getImage('/books/' + book.cover)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title white--text text-block" v-text="book.title"></span>
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
            <v-pagination :length="lengthPage" @input="go" v-model="page" :total-visible="4"></v-pagination>

        </template>
    </div>
</template>
  
<script>
import axios from "axios";
import { VPagination } from 'vuetify/lib';

export default {
    data() {
        return {
            category: {},
            books: [],
            page: 0,
            lengthPage: 0,
        };
    },
    methods: {
        go() {
            let slug = this.$route.params.slug;
            let url = '/categories/slug/' + slug;
            if (this.page > 0) url = url + '?page=' + this.page;
            url = encodeURI(url);
            axios
                .get(`${process.env.VUE_APP_BACKEND_URL}` + url)
                .then((response) => {
                    let response_data = response.data;
                    let category = response_data.data; // Corrected: Access the data property
                    this.category = category;
                    this.books = category.books.data;
                    this.lengthPage = category.books.last_page;
                    console.log(this.lengthPage);
                })
                .catch((error) => {
                    let response = error.response;
                    console.log(response);
                });
        },

        getImage(image) {
            if (image != null && image.length > 0) {
                const prefix = process.env.VUE_APP_BACKEND_URL.replace('/api/v1', '');
                return `${prefix}/storage/images/${image}`;
            }
            return "/img/unavailable.jpg";
        },
    },
    created() {
        this.go();
    },
    components: {
        VPagination
    }
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