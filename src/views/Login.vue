<template>
  <div class="login">
    <div class="login_left">
      <img src="../assets/login.svg" alt="" class="login_left_image" />
    </div>
    <div class="login_right">
      <h2>Login</h2>
      <h4 class="login_error">{{ message }}</h4>
      <form class="form">
        <div class="form_input_wrapper">
          <label for="email">EMAIL *</label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            class="form_input"
          />
        </div>
        <div class="form_input_wrapper">
          <label for="password">PASSWORD *</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            class="form_input"
          />
        </div>
        <button @click="handleLogin" class="login_button">LOGIN</button>
      </form>
    </div>
  </div>
</template>
<script>
import AuthService from "../services/AuthService";
export default {
  data() {
    return {
      message: "",
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleLogin(e) {
      e.preventDefault();
      console.log(this.formData);
      if (!this.formData.email || !this.formData.password) {
        this.message = "Email & Password Required !";
        return;
      }
      const formData = {
        email: this.formData.email,
        password: this.formData.password,
      };
      console.log("formData???",formData);
      AuthService.login(formData)
        .then((response) => {
          if (response.data.loggedin === true) {
            sessionStorage.setItem("authenticated", response.data.loggedin);
            this.$router.push({ name: "albums" });
          }
        })
        .catch((e) => {
          console.log("error?",e);
          this.message = e.response.data.message;
        });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

.login {
  display: grid;
  grid-template-columns: 1fr 35%;
  height: 100vh;
}
.login_left {
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, #efd5ff 0%, #73737449 20%);
}
.login_left_image {
  width: 80%;
  height: 80%;
  object-fit: contain;
}
.login_right {
  background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
  padding: 25% 40px 0px 40px;
}
.login_right h2 {
  font-size: clamp(26px, 5vw, 38px);
  font-family: "Varela Round", sans-serif;
  color: var(--violetColor);
  padding: 10px 0px;
}

.form_input_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15px 0px;
}
.form_input_wrapper input {
  border: 1px solid var(--violetColor);
  padding: 10px;
  outline: 0;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
}
.form_input_wrapper input:focus {
  box-shadow: var(--boxShadow);
}
.form_input_wrapper label {
  font-size: 14px;
  color: var(--primaryColor);
}

.login_error {
  padding: 1px 20px;
  text-align: center;
  font-size: 14px;
  text-transform: uppercase;
  background: var(--fadedGreyColor);
  margin: 10px 0;
  border-radius: 10px;
  color: var(--redColor);
  transition: all 0.4s ease-in-out;
}
</style>
