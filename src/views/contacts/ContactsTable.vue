<template>
  <b-row align-h="center">
    <b-col cols="12">
      <b-table
        striped
        small
        :busy="loadingItems"
        :items="items"
        :fields="headers"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(emails)="data">
          <div>{{ stringEmails(data.item.emails) }}</div>
        </template>
      </b-table>
    </b-col>
    <b-col cols="12" sm="6">
       <b-row align-h="center">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          first-number
        ></b-pagination>
       </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ContactsTable',

  props: {
    loadingItems: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Object,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    perPage: 10,
    currentPage: 1,
    rows: 0,
  }),

  watch: {
    pagination() {
      this.adjustPagination();
    },
  },

  methods: {
    adjustPagination() {
      const { total, start, limit } = this.paginacao;
      this.perPage = limit;
      this.currentPage = start + 1;
      this.rows = total;
    },

    stringEmails(emailsArray) {
      const emailString = emailsArray.map((email) => email.address).join(' ')
      
      return emailString;
    },
  },
};
</script>
