<template>
  <main>
    <b-container class="mt-3">
      <b-row>
        <h2 class="bd-content-title">Contatos</h2>
        <FormDefault
          tooltipTitle="Novo Contato"
          modalTitle="Novo Contato"
          routeName="contacts"
        />
      </b-row>
      <TableDefault
        :loadingItems="loadingItems"
        :items="contacts"
        :headers="headers"
        :pagination="pagination"
        @new-search="searchContacts"
      />
    </b-container>
  </main>
</template>

<script>
import http from '../../utils/http';
import TableDefault from '../../components/TableDefault.vue';
import FormDefault from '../../components/FormDefault.vue';

export default {
  name: 'Contacts',

  components: {
    TableDefault,
    FormDefault,
  },

  data: () => ({
    loadingItems: false,
    pagination: {
      limit: 10,
      start: 0,
      total: 0,
    },
    contacts: [],
    headers: [
      {
        key: 'id',
        label: 'ID',
      },
      {
        key: 'name',
        label: 'Nome',
      },
      {
        key: 'emails',
        label: 'Emails',
      },
      {
        key: 'employers',
        label: 'Contatos',
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
          this.contacts = results;
          this.pagination = Object.assign(this.pagination, pagination);
          this.loadingItems = false;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
