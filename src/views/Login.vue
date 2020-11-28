<template>
  <b-row align-h="center" align-v="center" class="login">
    <b-card
      style="max-width: 500px; width: 400px"
      title="Bem Vindo"
    >
      <b-card-text>
        <b-form @submit="getUsers">
          <b-form-group>
            <b-form-input
              type="email"
              required
              placeholder="Email"
              class="my-2"
              v-model="loginForm.email"
            ></b-form-input>
            <b-form-input
              type="password"
              required
              placeholder="Senha"
              class="my-2"
              v-model="loginForm.password"
            ></b-form-input>
          </b-form-group>
          <b-row align-h="center">
            <b-button type="submit" variant="primary">Entrar</b-button>
          </b-row>
        </b-form>
      </b-card-text>
    </b-card>
  </b-row>
</template>

<script>
import http from '../utils/http';

export default {
  name: 'Login',

  data: () => ({
    loginForm: {
      email: '',
      password: '',
    },
    users: [],
  }),

  methods: {
    getUsers(evt) {
      evt.preventDefault();

      http('GET', 'users')
        .then(({ results }) => {
          this.users = results;

          this.checkUser();
        })
        .catch((error) => console.error(error));

      // this.$router.push('/');
    },

    checkUser() {
      const { email } = this.loginForm;
      const userExist = this.users
        .map((user) => user.username)
        .includes(email);
      
      if (userExist) {
        this.loginUser();
        return;
      }
    },
 
    loginUser() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .login {
    height: 100vh;
    width: 100%;
    background: radial-gradient(
      circle at top right,
      #fff 70%,
      #007bff 30%,
    );
  }
</style>
