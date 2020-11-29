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
  name: 'TableDefault',

  props: {
    loadingItems: {
      type: Boolean,
      default: false,
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
    perPage: 20,
    currentPage: 1,
    rows: 0,
  }),
};
</script>
