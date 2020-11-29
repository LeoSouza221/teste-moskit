<template>
  <div class="ml-auto">
    <b-button
      size="md"
      variant="success"
      v-b-tooltip.hover
      v-b-modal.modal-create
      title="Novo Contato"
    >
      <b-icon icon="plus-circle"></b-icon>
    </b-button>

    <b-modal
      id="modal-create"
      title="Criar Contato"
      centered
      hide-footer
    >
      <b-row align-h="center">
         <Alert
          :message="message"
          :variant="variant"
          :dismissCountDown="dismissCountDown"
        />
      </b-row>
      <b-form @submit="defineEmailsAndSave">
        <b-form-group>
          <b-form-input
            type="text"
            required
            placeholder="Nome"
            class="my-2"
            v-model="newContact.name"
          ></b-form-input>
          <b-form-textarea
            id="textarea"
            v-model="emails"
            placeholder="Digite os emails separados por virgula"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <CompanyAutocomplete />
        </b-form-group>
        <b-row align-h="center">
          <b-button type="submit" variant="success">Salvar</b-button>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import http from '../../utils/http';
import Alert from '../../components/Alert.vue';
import CompanyAutocomplete from '../../components/CompanyAutocomplete.vue';

export default {
  name: 'ContactsCreate',

  components: {
    Alert,
    CompanyAutocomplete,
  },

  data: () => ({
    dismissCountDown: 0,
    variant: 'danger',
    emails: '',
    employees: '',
    message: '',
    newContact: {
      name: '',
      responsible: {
        id: '49785',
      },
      emails: [],
      employees: [],
    },
  }),

  methods: {
    closeModal() {
      this.$refs['modal-create'].hide();
    },

    saveContact() {
      http.POST('contacts', this.newContact)
        .then((response) => {
          this.showMessage('Sucesso', 'success');
          this.contactDetails(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    defineEmailsAndSave(evt) {
      evt.preventDefault();

      if (this.emails.length) {
        this.newContact.emails= this.emails.split(',')
          .map((email) => ({ address: email.trim() }));
      }

      this.saveContact();
    },

    showMessage(message, color) {
      this.variant = color;
      this.message = message;
      this.dismissCountDown = 5;
    },
    
    contactDetails(contact) {
      const { id } = contact;
      this.$router.push({ name: 'ContactDetails', params: { id: id }});
    },
  },
};
</script>
