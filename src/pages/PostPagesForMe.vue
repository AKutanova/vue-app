<template>
  <div>

    <div class="header">
        <h1>Посты с пагинацией</h1>
        <buttonCommon @click = "show=true">Добавить пост</buttonCommon>
    </div>

    <my-dialog v-model:show="show">
        <PostForm @create = "createPost"/>
    </my-dialog>

    <div class="wrapper__search">
        <my-input v-model="searchText" class = "search__input" placeholder="Найти в названии"/>

        <MySelect v-model="selectSort" :options="selectOptions"></MySelect>
        {{selectSort}}
    </div>

    <PostList v-if="posts.length > 0" :pppposts="searchAndSort" @delete-post="deletePost"/>
    <PageNumber :pages="pageNumbers"  @change-active-page="changePage" />
    <!-- <PageNumber /> -->
  </div>
</template>

<script>
import axios from 'axios';
import PostList from '@/components/postList.vue';
import PostForm from '@/components/postForm.vue';
import MySelect from '@/components/UI/MySelect.vue';
import PageNumber from '@/components/pageNumber.vue'

export default {
    components: { PostList, PostForm, MySelect, PageNumber},
    data() {
        return {
            posts: [],
            show: false,
            searchText: '',
            selectSort: '',
            selectOptions: [
                {name: 'По названию', value: 'title'},
                {name: 'По содержанию', value: 'body'}
            ],
            limit: 20,
            totalPosts: 0,
            activePage: 1,
            pageNumbers: {}
        }
    },

    methods: {
        async fetchPosts() {
            try {
                const data = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.activePage
                    }
                });
                this.totalPosts = data.headers["x-total-count"];
                this.pageNumbers['totalPages'] = Math.ceil(this.totalPosts/this.limit);
                this.pageNumbers['activePage'] = this.activePage;
                console.log(this.pageNumbers)
                
                this.posts = data.data;
            } catch(e) {
                console.log(`Ошибка ${e}`);
            }
        },

        deletePost(element) {
            this.posts = this.posts.filter(post => post.id !== element.id);
        },

        createPost(post) {
            this.posts.push(post);
            this.show = false;
        },

        changePage(pageNumber) {
            this.activePage = pageNumber;
            console.log(this.activePage)
        }
    },

    mounted() {
        this.fetchPosts();
    },

    computed: {
        searchQuery() {
            return this.posts.filter(post => post.title.includes(this.searchText));
        },

        searchAndSort() {
            return [...this.searchQuery].sort((post1, post2) => {
                return post1[this.selectSort]?.localeCompare(post2[this.selectSort]);
            });
        }
    },

    watch: {
        activePage() {
            this.fetchPosts();
        }
    }
}
</script>

<style>

</style>