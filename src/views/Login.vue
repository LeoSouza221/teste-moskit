<template>
  <b-row align-h="center" align-v="center" class="login">
    <Alert
      :message="message"
      :dismissCountDown="dismissCountDown"
    />
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
import Alert from '../components/Alert.vue';

export default {
  name: 'Login',

  components: {
    Alert,
  },

  data: () => ({
    dismissCountDown: 0,
    message: '',
    loginForm: {
      email: 'leonardo@moskitselecao.com.br',
      password: '',
    },
    users: [],
  }),

  methods: {
    getUsers(evt) {
      evt.preventDefault();

      http.GET('users')
        .then(({ results }) => {
          this.users = results;

          this.checkUser();
        })
        .catch((error) => console.error(error));
    },

    checkUser() {
      const { email } = this.loginForm;
      const position = this.users
        .map((user) => user.username)
        .findIndex((username) => username === email);

      if (position >= 0) {
        const user = this.users[0];
        this.loginUser(user);

        return;
      }

      this.dismissCountDown = 5;
      this.message = 'Informações inválidas'
    },
 
    loginUser(user) {
      this.$store.dispatch('saveCurrentUser', user)
        .then(() => {
          this.$router.push('/contacts');
        });
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
