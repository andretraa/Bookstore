<template>
    <v-app-bar dark color="primary">
        <!-- header bagian kiri -->
        <v-app-bar-nav-icon v-if="isHome" @click="setSideBar(!sideBar)"></v-app-bar-nav-icon>
        <v-btn v-if="!isHome" icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <!-- header bagian tengan -->
        <v-toolbar-title class="white--text">Bookstore</v-toolbar-title>

        <!-- sperator supaya header bagian kanan posisinya rata kanan -->
        <v-spacer></v-spacer>

        <!-- header bagian kanan -->
        <!-- <v-btn icon>
            <v-badge left overlay color="orange">
                <template v-slot:badge>
                    <span>1</span>
                </template>
                <v-btn icon>
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </v-badge>
        </v-btn> -->
        <v-btn class="text-none" icon stacked>
            <v-badge content="2" color="error" left>
                <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>

        <!-- colom pencarian di bawah header -->
        <v-text-field v-if="isHome" hide-details append-icon="mdi-microphone" label="Search" prepend-inner-icon="mdi-magnify" solo-inverted>
        </v-text-field>

    </v-app-bar>
        
</template>

<script>

    import { mapGetters, mapActions } from "vuex";
    
    export default {
        name: 'c-header',
        methods: {
            ...mapActions({
                setSideBar : 'setSideBar',
            }),
        },
        computed: {
            ...mapGetters({
                sideBar : 'sideBar',
            }),
            isHome () {
                return (this.$route.path==='/')
            },
        },
    }
</script>