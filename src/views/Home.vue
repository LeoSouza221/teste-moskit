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
    'userLogged',
  ]),

  created() {
    if (!this.userLogged) {
      this.$router.push('/login');
    }
  },
};
</script>
