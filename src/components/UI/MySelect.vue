<template>
  <select name="" id="" v-model="modelValue" @change="changeOption">
    <option disabled value="">Сортировать по...</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
    name: 'my-select',
    props: {
        modelValue: '',
        options: null
    },

    methods: {
        changeOption(event) {
            console.log(event.target);
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style>

</style>