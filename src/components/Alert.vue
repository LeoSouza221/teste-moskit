<template>
  <div class="alert-message">
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant='variant'
    >
      <p>{{ message }}</p>
    </b-alert>
  </div>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    variant: {
      type: String,
      default: 'danger',
    },
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
