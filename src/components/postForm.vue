<template>
    <div>
        <form @submit.prevent>
            <div class="h4">Создание поста</div>
            <my-input v-focus v-model="post.title" class="input" type="text" placeholder="Название"></my-input>
            <my-input v-model="post.body" class="input" type="text" placeholder="Описание"></my-input>
            <div class="form__actions">
                <buttonCommon 
                    class="button_submit" 
                    @click="createPost()"
                >
                    Добавить!
                </buttonCommon>                
            </div>
        </form>
    </div>
</template>

<script>
// import buttonCommon from './UI/buttonCommon.vue';

export default {
    // components: {
    //     buttonCommon
    // },
    data() {
        return {
            post: {
                id: '',
                title: '',
                body: ''
            }
        }
    },

    methods: {
        createPost() {
            this.post.id = Date.now();
            this.$emit('create', this.post);
            this.post = {
                id: '',
                title: '',
                body: ''
            }      
        }
    },

    // watch: {
    //     post: {
    //         handler(newValue) {
    //             console.log(newValue);
    //         },
    //         deep: true
    //     }
    // }
}
</script>

<style>
    form {
        background-color: #c8e5e1;
    }

    .form__actions {
        margin: 15px;
    }

    .h4 {
        padding: 20px;
        font-size: 24px;
        font-weight: bold;
    }
</style>