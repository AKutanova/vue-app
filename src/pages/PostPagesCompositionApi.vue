<template>
    <div>
        <TestInput v-model = "testInputText" textTest = "Лалала"></TestInput>

        <h1>Страница с постами </h1>
        <my-input 
            v-model = "searchQuery" 
            placeholder="Найти в названии..." 
            v-focus
        />

        <div>
            <buttonCommon @click="showDialog">Добавить пост</buttonCommon>
            <my-select
                v-model = "selectedSort"
                :options = "sortOptions">
            </my-select>
        </div>
        <!-- <my-input v-model.number ="inputValue"></my-input> -->
        <my-dialog v-model:show = "dialogVisible">
            <PostForm 
            @create="createPost"
        />
        </my-dialog>
        <div class="loading" v-show="isPostLoading">
            Идет загрузка...
        </div>
        <PostList 
            v-if="posts.length > 0" 
            :pppposts="sortedAndSearchedPosts"
            @delete-post="deletePost"
        />
        <h2 v-else>
            Постов еще нет
        </h2>
        <!-- <PageNumber
            :pages="{ totalPages: totalPages, activePage: page }" 
            @change-active-page = "changePage"
        /> -->
        <!-- <div ref="observer" class="observer"></div> -->
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/postForm.vue';
import PostList from '@/components/postList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import ButtonCommon from '@/components/UI/buttonCommon.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import PageNumber from '@/components/pageNumber.vue';
import TestInput from '@/components/TestInput.vue'
    
export default {
    components: {
        PostForm,
        PostList,
        MyDialog,
        ButtonCommon,
        MySelect,
        MyInput,
        PageNumber,
        TestInput
},

    data() {
        return {
            posts: [

            ],
            dialogVisible: false,
            inputValue: '',
            isPostLoading: false,
            limit: 20,
            page: 0,
            totalPages: 0,
            testInputText: '',
            searchQuery: '',
            selectedSort: '',
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'}
            ]
        }
    },
    methods: {
        inputTitle(event) {
            this.title = event.target.value;
        },

        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },

        deletePost(post) {
            this.posts = this.posts.filter((postItem) => postItem.id !== post.id);
        },

        showDialog() {
            this.dialogVisible = true;
        },

        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },

        async fetchPosts() {
            this.isPostLoading = true;

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                console.log(this.totalPages);
                this.posts = response.data;
            } catch(e) {
                console.log(`Ошибка ${e}`);
            } finally {
                this.isPostLoading = false;
            }
        },

        async loadMorePosts() {
            this.page += 1;

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                console.log(this.totalPages);
                this.posts = [...this.posts, ...response.data];
            } catch(e) {
                console.log(`Ошибка ${e}`);
            } 
        }
    },

    mounted() {
        this.fetchPosts();

        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //     if (entries[0].isIntersecting === true && this.page < this.totalPages) {
        //         this.loadMorePosts();
        //         console.log('пересечение');
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },

    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
            })
        },

        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(item => item.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },

    watch: {
        // selectedSort(newValue) {
        //     console.log(newValue);
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue]);
        //     });
        // },

        dialogVisible(showDialog) {
            console.log(showDialog);
        },

        // page() {
        //     this.fetchPosts();
        // }
        searchQuery() {
            console.log(this.searchQuery);
        },

        testInputText() {
            this.searchQuery = this.testInputText;
            console.log(this.testInputText);
        }
    }

}
</script>

<style>
    .observer {
        height: 30px;
        background-color: aqua;
    }
</style>