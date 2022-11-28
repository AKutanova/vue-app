<template>
  <input :value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: ''
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style>
    .input {
        margin: 15px;
        padding: 15px 20px;
        border: 2px solid rgb(12, 116, 102);
    }
</style>