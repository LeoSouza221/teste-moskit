<template>
  <div class="box">
    <b-form @submit="addEmployer">
      <b-form-group>
        <b-row class="my-2" align-h="center">
          <b-col cols="12">
            <h5>Adicionar Empregador</h5>
          </b-col>
          <b-col cols="12">
            <b-form-input
              placeholder="Cargo"
              v-model="employer.jobTitle"
              class="my-2"
            ></b-form-input>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-input
              required
              placeholder="Id da Empresa"
              v-model="employer.company.id"
              class="my-2"
            ></b-form-input>
          </b-col>
          <b-col cols="12" sm="6">
            <b-form-input
              required
              placeholder="Id do Contato"
              v-model="employer.contact.id"
              class="my-2"
            ></b-form-input>
          </b-col>
          <b-button variant="success" type="submit">Adicionar</b-button>
        </b-row>
      </b-form-group>
    </b-form>
  </div>
  
</template>

<script>
export default {
  name: '',

  props: {
    showMessage: {
      type: Function,
    },
  },

  data: () => ({
    employer: {
      company: { id: '' },
      contact: { id: '' },
      jobTitle: '',
    },
  }),

  methods: {
    addEmployer(evt) {
      evt.preventDefault();
      this.$emit('add-employer', this.employer);
      this.clearFields();
    },

    clearFields() {
      this.employer = {
        company: { id: '' },
        contact: { id: '' },
        jobTitle: '',
      };
    }
  },
};
</script>
