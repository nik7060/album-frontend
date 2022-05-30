<template>
  <v-app>
    <v-app-bar>
      <v-img
        class="mx-2"
        :src="logo"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <router-link to="/" class="logo">Manage Albums</router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn variant="text" @click="goList"> List </v-btn>
        <v-btn variant="text" @click="goAdd"> Add </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import logo from "./assets/oc-logo-white.png";
export default {
  name: "App",

  data: () => ({
    logo,
  }),
  methods: {
    goAdd() {
      this.$router.push({ name: "add" });
    },
    goList() {
      this.$router.push({ name: "albums" });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;800&display=swap");

:root {
  --primaryColor: rgb(53, 51, 51);
  --secondaryColor: rgb(142, 157, 255);
  --fadedGreyColor: #d3d3d3;
  --boxShadow: 0px 10px 20px rgba(0, 0, 0, 0.107);
  --fadedGreyBorder: 1px solid var(--fadedGreyColor);
  --blackColor:rgb(27, 27, 27);
  --whiteColor:#fff;
}

html {
  font-family: "Poppins", sans-serif !important;
}

h1,
h2,
h3,
h4,
h5,
h6,
span {
  color: var(--primaryColor);
}

.logo {
  text-decoration: none;
  font-size: 20px;
  color: #2b2a2a;
  font-weight: 600;
}
</style>
