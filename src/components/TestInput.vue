<template>
    <div>
        <input v-model = "someText" @input="entriText" type="text">
      {{ textTest }}
    </div>
</template>

<script>
export default {
    props: ['textTest'],
    data() {
        return {
            someText: 'wer'
        }
    },

    methods: {
        entriText(event) {
            // console.log(event.target.value);
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style>

</style>