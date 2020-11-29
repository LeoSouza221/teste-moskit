<template>
  <div v-if="userLogged">
    <b-navbar type="dark" variant="primary">
      <b-navbar-brand @click="redirectTo('/home')">Moskit</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item @click="redirectTo('/contacts')">Contatos</b-nav-item>
        <b-nav-item @click="redirectTo('/companies')">Empresas</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <h6 class="mr-2 mt-2 text-white">Olá, {{ user.name }}</h6>
        <b-button
          size="sm"
          variant="danger"
          v-b-tooltip.hover
          title="Sair"
          @click="userLogout"
        >
          <b-icon icon="box-arrow-right"></b-icon>
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationBar',

  computed: mapState([
    'user',
    'userLogged',
  ]),

  created() {
    if (!this.userLogged) {
      this.$router.push('/login');
    }
  },

  methods: {
    userLogout() {
      this.$store.dispatch('clearCurrentUser')
        .then(() => {
          this.$router.push('/login');
        });
    },

    redirectTo(route) {
      this.$router.push(route);
    },
  },
}
</script>