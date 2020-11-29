<template>
  <div>
    <b-form-input
      placeholder="Companies"
      v-model="company"
      class="my-2"
      list="all-companies"
      @change="teste"
    ></b-form-input>
    <datalist id="all-companies">
      <option
        v-for="(company, index) in companies"
        :key="index"
        >{{ company.jobTitle }}</option>
    </datalist>
  </div>
</template>

<script>
import http from '../utils/http';

export default {
  name: 'companyssAutocomplete',

  data: () => ({
    company: '',
    pagination: {
      limit: 10,
      offset: 0,
      total: 0,
    },
    companies: [],
  }),

  created() {
    this.search(this.pagination)
  },

  methods: {
    search(pagination) {
      http.GET('companies', pagination)
        .then(({ metadata: { pagination }, results }) => {
          this.companys = results;
          this.pagination = Object.assign(this.pagination, pagination);
        })
        .catch((error) => console.error(error));
    },

    teste(valor) {
      console.log(valor);
    },
  },
};
</script>
