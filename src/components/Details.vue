<template>
  <main class="details">
    <b-button
      size="md"
      variant="success"
      v-b-tooltip.hover
      title="Voltar"
      @click="backPage"
      class="mt-3 ml-3 button-position"
    >
      <b-icon icon="arrow-left"></b-icon>
    </b-button>
    <b-container class="container-align">
      <b-card
        tag="article"
      >
        <b-card-text>
          <b-row
            align-h="center"
            align-v="center"
            style="height: 100%"
          >
            <b-col cols="12">
              <h3>{{ details.id }} - {{ details.name }}</h3>
              <hr>
            </b-col>
            <b-col cols="12" md="6">
              <b-row align-h="start">
                <b-col cols="12">
                  <h5>Emails:</h5>
                </b-col>
                <b-col cols="12">
                  <ul>
                    <li v-for="(email, index) in details.emails" :key="index">
                      {{ email.address }}
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="12" md="6">
              <b-row align-h="start">
                <b-col cols="12">
                  <h5>Contatos:</h5>
                </b-col>
                <b-col cols="12">
                  <ul>
                    <li v-for="(email, index) in details[defineType]" :key="index">
                      {{ email.jobTitle }}
                    </li>
                  </ul>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card-text>
      </b-card>
    </b-container>
  </main>
  
</template>

<script>
import http from '../utils/http';

export default {
  name: 'Details',

  data: () => ({
    details: {},
  }),

  created() {
    const { id } = this.$route.params;
    const { routeName } = this.$route.query;

    this.searchDetails(id, routeName);
  },

  computed: {
    defineType() {
      const { routeName } = this.$route.query;

      return routeName === 'companies' ? 'employees' : 'employers'
    },
  },

  methods: {
    searchDetails(id, routeName) {  
      http.GET(`${routeName}/${id}`)
        .then((response) => {
          this.details = response;
        })
        .catch((error) => console.error(error));  
    },

    backPage() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
  ul {
   columns: 2;
  }

  .details {
    height: calc(100vh - 56px);
  }

  .container-align {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button-position {
    position: absolute;
  }
</style>
