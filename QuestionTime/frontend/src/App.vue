<template>
    <navbar-component />

    <router-view />
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";

import { apiService } from "@/common/api.service"

export default {
    name: "App",
    components: {
        NavbarComponent,
    },
    methods: {
        async setUserInfo(){
            const data = await apiService("/api/user/")
            const requestUser = data["username"];
            window.localStorage.setItem("username", requestUser)
        }
    },
    created(){
        this.setUserInfo()
    }
};
</script>

<style>
html,
body {
    height: 100%;
    font-family: "Playfair Display", serif;
}
.btn:focus {
    box-shadow: none !important;
}
</style>
