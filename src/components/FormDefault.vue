<template>
  <div class="ml-auto">
    <b-button
      size="md"
      variant="success"
      v-b-tooltip.hover
      v-b-modal.modal-create
      :title="tooltipTitle"
    >
      <b-icon icon="plus-circle"></b-icon>
    </b-button>
    <b-modal
      id="modal-create"
      :title="modalTitle"
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
            v-model="newPost.name"
          ></b-form-input>
          <b-form-textarea
            id="textarea"
            v-model="emails"
            placeholder="Digite os emails separados por virgula"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
          <EmployerCreate
            @add-employer="addEmployer"
          />
        </b-form-group>
         <div class="box" v-if="newPost[defineType].length">
            <div
              v-for="(employer, index) in newPost[defineType]"
              :key="index"
            >
              <b-button
                variant="success"
                @click="removeCompany(employer.jobTitle)"
                class="mx-2"
              >
                {{ employer.jobTitle }}
                <b-icon icon="x-circle"></b-icon>
              </b-button>
            </div>
          </div>
        <b-row align-h="center">
          <b-button type="submit" variant="success">Salvar</b-button>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import http from '../utils/http';
import Alert from './Alert.vue';
import EmployerCreate from './EmployerCreate';

export default {
  name: 'FormDefault',

  components: {
    Alert,
    EmployerCreate,
  },

  props: {
    tooltipTitle: {
      type: String,
      default: 'Novo',
    },
    modalTitle: {
      type: String,
      default: 'Novo',
    },
    routeName: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    dismissCountDown: 0,
    variant: 'danger',
    emails: '',
    message: '',
    newPost: {
      name: '',
      responsible: {
        id: '', // DEFINIR ID RESPONSIBLE
      },
      emails: [],
      employers: [],
      employees: [],
    },
  }),

  computed: {
    defineType() {
      return this.routeName === 'companies' ? 'employees' : 'employers'
    },
  },

  methods: {
    saveContact() {
      http.POST(this.routeName, this.newPost)
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
        this.newPost.emails= this.emails.split(',')
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
      this.$router.push({
        name: 'Details',
        params: { id: id },
        query: { routeName: this.routeName },
      });
    },

    addEmployer(employer) {
      if (this.routeName === 'companies') {
        this.newPost.employees.push(employer);
        return;
      }
      this.newPost.employers.push(employer);
    },

    removeCompany(jobTitle) {
      const position = this.newPost[this.defineType].findIndex((company) => company.jobTitle === jobTitle);

      if (position >= 0) {
        this.newPost.employers.splice(position, 1);
      }
    },
  },
};
</script>

<style>
  .box {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    transition: height 0.5s ease-in;
    border: 1px solid;
    padding: 4px;
    margin: 5px;
    border-radius: 5px;
  }
</style>