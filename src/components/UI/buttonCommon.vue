<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'buttonCommon'
}
</script>

<style>
    .button {
        padding: 15px 20px;
        color: #ffffff;
        background-color: rgb(12, 116, 102);
        border: none;
        font-weight: 500;
        text-transform: uppercase;
        cursor: pointer;
    }
</style>