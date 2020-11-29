<template>
  <main>
    <b-container class="my-3">
      <h3>{{ contact.id }} - {{ contact.name }}</h3>
      <hr>
      <b-row align-h="center">
        <b-col cols="12" sm="6">
          <b-row align-h="center">
            <b-col cols="12">
              <h5>Emails</h5>
            </b-col>
            <b-col cols="12">
              <ul>
                <li v-for="(email, index) in contact.emails" :key="index">
                  {{ email.address }}
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-col>
        <b-row cols="12" sm="6">
          <b-row align-h="center">
            <b-col cols="12">
              <h5>Contatos</h5>
            </b-col>
            <b-col cols="12">
              <ul>
                <li v-for="(email, index) in contact.employers" :key="index">
                  {{ email.jobTitle }}
                </li>
              </ul>
            </b-col>
          </b-row>
        </b-row>
      </b-row>
    </b-container>
  </main>
  
</template>

<script>
import http from '../../utils/http';

export default {
  name: 'ContactDetails',

  data: () => ({
    contact: '',
  }),

  created() {
    const { id } = this.$route.params;
    this.searchContact(id);
  },

  methods: {
    searchContact(id) {  
      http.GET(`contacts/${id}`)
        .then((response) => {
          console.log(response);
          this.contact = response;
        })
        .catch((error) => console.error(error));  
    },
  },
};
</script>

<style>
  ul {
   columns: 2;
  }

  .container-img {
    height: 130px;
  }
</style>
