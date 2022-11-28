<template>
    <div>
        <div class="header">
            <h1>Страница с постами</h1>
            <buttonCommon @click="showDialog">Добавить пост</buttonCommon>
        </div>

        <div class="wrapper__search">
            <my-input 
                :model-value = "searchQuery"
                class = "search__input"
                @update:model-value="setSearchQuery"
                placeholder="Найти в названии..." 
                v-focus
            />

            <my-select
                :model-value = "selectedSort"
                @update:model-value="setSelectedSort"
                :options = "sortOptions">
            </my-select>
        </div>

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

        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from '@/components/postForm.vue';
import PostList from '@/components/postList.vue';
import MyDialog from '@/components/UI/MyDialog.vue';
import ButtonCommon from '@/components/UI/buttonCommon.vue';
import MySelect from '@/components/UI/MySelect.vue';
import MyInput from '@/components/UI/MyInput.vue';
import PageNumber from '@/components/pageNumber.vue';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
    
export default {
    components: {
        PostForm,
        PostList,
        MyDialog,
        ButtonCommon,
        MySelect,
        MyInput,
        PageNumber,
},

    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),

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
        }
    },

    mounted() {
        this.fetchPosts();
    },

    computed: {
        ...mapState({
            posts: state => state.post.posts,
            inputValue: state => state.post.inputValue,
            isPostLoading: state => state.post.isPostLoading,
            limit: state => state.post.limit,
            page: state => state.post.page,
            totalPages: state => state.post.totalPages,
            testInputText: state => state.post.testInputText,
            searchQuery: state => state.post.searchQuery,
            selectedSort: state => state.post.selectedSort,
            sortOptions: state => state.post.sortOptions
        }),

        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },

    watch: {
        dialogVisible(showDialog) {
            console.log(showDialog);
        },

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