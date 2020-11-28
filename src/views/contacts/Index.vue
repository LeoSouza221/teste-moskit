<template>
  <main>
    <b-container class="mt-3">
      <b-row>
        <h2 class="bd-content-title">Contatos</h2>
      </b-row>
      <TableDefault
        :loadingItems="loadingItems"
        :items="contacts"
        :headers="headers"
      />
    </b-container>
  </main>
</template>

<script>
import http from '../../utils/http';
import TableDefault from '../../components/TableDefault.vue';

export default {
  name: 'Contacts',

  components: {
    TableDefault,
  },

  data: () => ({
    loadingItems: false,
    contacts: [],
    headers: [
      {
        key: 'name',
        label: 'Nome',
      },
    ],
  }),

  created() {
    this.searchContacts();
  },

  methods: {
    searchContacts() {
      this.loadingItems = true;

      http('GET', 'contacts')
        .then(({ results }) => {
          this.contacts = results;
          this.loadingItems = false;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
