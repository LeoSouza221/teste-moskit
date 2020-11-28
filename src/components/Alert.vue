<template>
  <div class="alert-message">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
    >
      <p>{{ message }}</p>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    message: {
      type: String,
      required: true,
      default: '',
    },
    dismissCountDown: {
      type: Number,
      required: true,
      default: 0,
    }
  },
};
</script>

<style>
  .alert-message {
    position: absolute;
    top: 10px;
  }
</style>
