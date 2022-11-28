<template>
    <div class="dialog" v-show="show" @click.stop="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin'

export default {
    name: 'my-dialog',
    mixins: [toggleMixin],
    // props: {
    //     show: {
    //         type: Boolean,
    //         default: false
    //     }
    // },

    // methods: {
    //     hideDialog() {
    //         this.$emit('update:show', false);
    //     }
    // }
}
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.dialog__content {
    min-width: 300px;
    min-height: 324px;
    width: 600px;
    height: 200px;
    border-radius: 2px;
    background-color: #c8e5e1;
    padding: 10px 30px 30px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>