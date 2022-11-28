<template>
    <div class="page__wrapper">
        <div
            v-for="pageNumber in pages.totalPages" :key="pageNumber"
            class="page__number"
            :class="{ 'active': pageNumber === pages.activePage }"
            :style="{ 'color': 'red' }"
            @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pages: {
            type: Object,
            required: true,
            totalPages: 0,
            activePage: 0 
        }
    },

    methods: {
        changePage(pageNumber) {
            this.$emit('change-active-page', pageNumber);
        }
    }
}
</script>

<style>
    .page__wrapper {
        margin-top: 50px;
        display: flex;
    }

    .page__number {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        padding: 4px;
        border: 1px solid rgb(99, 163, 131);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .page__number.active {
        background-color: rgba(99, 163, 131, 0.3);
    }

    .page__number:hover {
            background-color: rgba(99, 163, 131, 0.5);
    }    
</style>