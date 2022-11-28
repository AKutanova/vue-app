<template>
    <div>
        <transition-group name="list">
            <postItem 
            v-for="post in pppposts"
            :postik="post"
            :key="post.id"
            @delete-post="$emit('delete-post', post)"
            />
        </transition-group>
    </div>   
</template>

<script>
import postItem from './postItem.vue';

export default {
    components: { postItem },
    props: {
        pppposts: {}
    },

    computed: {

    },
    methods: {
        word(floorLength) {
            const wordArray = ['квартира', 'квартиры', 'квартир'];

            return `${floorLength} квартира`;
        }
    }
}
</script>

<style>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(20px);
    }

    .list-move {
        transition: transform 0.3s ease;
    }
</style>