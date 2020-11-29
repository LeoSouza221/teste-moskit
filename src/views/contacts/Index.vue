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
    pagination: {
      limit: 10,
      total: 0,
    },
    contacts: [],
    headers: [
      {
        key: 'name',
        label: 'Nome',
      },
    ],
  }),

  created() {
    this.searchContacts(this.pagination);
  },

  methods: {
    searchContacts(pagination) {
      this.loadingItems = true;

      http.GET('contacts', pagination)
        .then(({ metadata: { pagination }, results }) => {
          // this.contacts = results;
          this.pagination = pagination;
          this.loadingItems = false;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
