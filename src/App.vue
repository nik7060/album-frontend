<template>
  <div class="header" v-if="currentPath !== '/login'">
    <div class="header_left">
      <img
        class="header_logo"
        :src="logo"
      />
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
import AuthService from "./services/AuthService";
import logo from "./assets/app_logo.svg";
export default {
  name: "App",
  data: () => ({
    logo,
    currentPath: "",
  }),
  methods: {
    goAdd() {
      this.$router.push({ name: "add" });
    },
    goList() {
      this.$router.push({ name: "albums" });
    },
    handleLogout() {
      const email = sessionStorage.getItem("email");
      AuthService.logout(email).then((response) => {
        console.log("logout response??", response);
        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("email");
        this.$router.push({ name: "login" });
      });
    },
  },
  created() {
    const isAuthenticated = sessionStorage.getItem("authenticated");
    if (isAuthenticated === "true") {
      this.$router.push({ name: "albums" });
    } else {
      this.$router.push({ name: "login" });
    }
    this.$watch(
      () => this.$route.params,
      () => {
        this.currentPath = this.$route.path;
      }
    );
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
.header_logo{
  height:  75px;
  width: 75px;
  margin: 0 20px;
  object-fit: contain;
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
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 40px;
  box-shadow: var(--boxShadow);
  border-bottom: 3px solid #c8c6c6a8;
}
.header_left {
  display: grid;
  grid-template-columns: 20% 1fr;
  align-items: center;
  justify-content: space-between;
  column-gap: 25px;
}
</style>
