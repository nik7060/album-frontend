<template>
  <div class="header">
    <div class="header_left">
      <v-img
        class="mx-2"
        :src="logo"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <router-link to="/" class="logo">Manage Albums</router-link>
    </div>

 <div class="header_right">
      <v-toolbar-items>
      <v-btn variant="text" @click="goList"> List </v-btn>
      <v-btn variant="text" @click="goAdd"> Add </v-btn>
    </v-toolbar-items>
    <button @click="handleLogout" class="login_button">LOGOUT</button>
 </div>
  </div>
  <div>
    <router-view />
  </div>
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
    handleLogout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("authenticated");
      this.$router.push({ name: "login" });
    },
  },
  created() {
    const token = sessionStorage.getItem("token");
    const isAuthenticated = sessionStorage.getItem("authenticated");
    if (token === "12345" && isAuthenticated === "true") {
      this.$router.push({ name: "albums" });
    } else {
      this.$router.push({ name: "login" });
    }
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
  --blackColor: rgb(27, 27, 27);
  --whiteColor: #fff;
  --violetColor: #11113d;
  --redColor: orangered;
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

.login_button {
  border: 1px solid var(--violetColor);
  padding: 10px 20px;
  outline: 0;
  border-radius: 5px;
  margin: 10px auto;
  color: var(--violetColor);
  transition: all 0.3s ease-in-out;
  letter-spacing: 2px;
}
.login_button:hover {
  background: var(--secondaryColor);
  color: var(--whiteColor);
  border: 1px solid transparent;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 40px;
  box-shadow: var(--boxShadow);
  border-bottom: 3px solid #c8c6c6a8;
}
.header_left{
  display: grid;
  grid-template-columns: 20% 1fr;
  align-items: center;
  width: 20%;
}
</style>
