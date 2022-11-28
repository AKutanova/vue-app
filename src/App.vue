<template>
    <div class="main">
        <Navigation />
        <router-view></router-view>
    </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
export default {
    components: { Navigation }
}
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        box-sizing: border-box;
    }

    body {
        background: #181717;
        color: rgb(99, 163, 131);
    }

    .main {
        padding: 30px;
    }
</style>