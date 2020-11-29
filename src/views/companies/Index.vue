<template>
  <main>
    <b-container class="mt-3">
      <b-row>
        <h2 class="bd-content-title">Empresas</h2>
        <FormDefault
          tooltipTitle="Nova Empresa"
          modalTitle="Nova Empresa"
          routeName="companies"
          routerPush="CompanyDetails"
        />
      </b-row>
      <TableDefault
        :loadingItems="loadingItems"
        :items="companies"
        :headers="headers"
        :pagination="pagination"
        @new-search="searchCompanies"
      />
    </b-container>
  </main>
</template>

<script>
import http from '../../utils/http';
import TableDefault from '../../components/TableDefault.vue';
import FormDefault from '../../components/FormDefault.vue';

export default {
  name: 'Companies',

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
    companies: [],
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
    this.searchCompanies(this.pagination);
  },

  methods: {
    searchCompanies(pagination) {
      this.loadingItems = true;

      http.GET('companies', pagination)
        .then(({ metadata: { pagination }, results }) => {
          this.companies = results;
          this.pagination = Object.assign(this.pagination, pagination);
          this.loadingItems = false;
        })
        .catch((error) => console.error(error));
    },
  },
};
</script>
