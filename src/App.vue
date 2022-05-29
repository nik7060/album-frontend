<template>
    <v-app>
      <v-app-bar  >
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
                <v-btn 
                    variant="text"
                    @click="goList"
                    >
                  List
                </v-btn>
                <v-btn 
                    variant="text"
                    @click="goAdd"
                    >
                  Add
                </v-btn>
            </v-toolbar-items>
      </v-app-bar>
      <v-main >
        <v-container>
          <router-view />
        </v-container>
      </v-main>  
    </v-app>
</template>

<script>
import logo from './assets/oc-logo-white.png'
export default {
  name: 'App',

  data: () => ({
    logo,
  }),
  methods: {
    goAdd() {
      this.$router.push({ name: 'add' });
    },
    goList() {
      this.$router.push({ name: 'albums' });
    }
  },

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;800&display=swap');

:root{
--primaryColor:rgb(67, 65, 65);
--secondaryColor:slateblue;
--boxShadow:0px 10px 20px rgba(0, 0, 0, 0.107);
}

html{
  font-family: 'Poppins', sans-serif !important;
}

h1,h2,h3,h4,h5,h6,span{
  color: var(--primaryColor);
}

.logo{
  text-decoration: none;
  font-size: 20px;
  color:#2b2a2a;
  font-weight: 600;
}
</style>
