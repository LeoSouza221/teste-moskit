<template>
  <b-card
    style="max-width: 20rem;"
    class="mb-2"
  >
    <b-card-text>
      <b-form-group
      >
        <b-form-input
          id="input-1"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
    </b-card-text>
    <b-button href="#" variant="primary">Entrar</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'Login',
};
</script>
