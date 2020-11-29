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
      <Alert
        :message="message"
        :dismissCountDown="dismissCountDown"
      />
      <b-form @submit="defineEmailSAndSave">
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

export default {
  name: 'ContactsCreate',

  components: {
    Alert,
  },

  data: () => ({
    dismissCountDown: 0,
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
          if (response.hasOwnProperty('message')) {
            const { message } = response;

            this.message = message;
            this.dismissCountDown = 5;
          }

          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    defineEmailSAndSave(evt) {
      evt.preventDefault();

      this.newContact.emails = this.emails.split(',')
        .map((email) => ({ address: email.trim() }));

      this.saveContact();
    },
  },
};
</script>
