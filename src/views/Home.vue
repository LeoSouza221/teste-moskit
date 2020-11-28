<template>
  <b-container fluid>
    <h1>teste</h1>
  </b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',

  components: {
  },

  computed: mapState([
    'usuarioLogado',
  ]),

  created() {
    console.log('aki');
    if (!this.usuarioLogado) {
      this.$router.push('/login');
    }
  },
};
</script>
