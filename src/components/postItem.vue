<template>
    <div class="post">
        <div>
            <div><strong>Id: </strong>{{postik.id}}</div>
            <div><strong>Название: </strong>{{postik.title}}</div>
            <div><strong>Описание: </strong>{{postik.body}}</div>            
        </div>
        <div class="post__buttons">
            <buttonCommon class="button_delete" @click="$router.push(`/posts/${postik.id}`)">Открыть</buttonCommon>
            <buttonCommon class="button_delete" @click="delPost">Удалить</buttonCommon>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        postik: {
            type: Object,
            required: true,
            title: '',
            body: ''
        }
    },
    methods: {
        delPost() {
            this.$emit('delete-post', this.postik);
        },

        openPost() {
            
        }
    }
}
</script>

<style scoped>

    .post {
        margin-top: 15px;
        padding: 20px;
        border: 2px solid rgb(12, 116, 102);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    @media (max-width: 767px) {
        .post {
            flex-direction: column; 
            align-items: flex-start;           
        }
    }
    .post__buttons {
        display: flex;
    }

    @media (max-width: 767px) {
        .post__buttons {
            margin-top: 20px;            
        }
    }

    .button_delete {
        margin: 5px;
        padding: 10px 15px;
    }
</style>