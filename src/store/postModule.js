import axios from 'axios';

export const postModule = {
    state: () => ({
        posts: [],
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
    }),

    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
            })
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        setLoading(state, loading) {
            state.isPostLoading = loading;
        },
        
        setPage(state, page) {
            state.page = page;
        },

        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        }
    },

    actions: {
        async fetchPosts({state, commit}) {
            commit('setLoading', true);

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });

                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);

            } catch(e) {
                console.log(`Ошибка ${e}`);

            } finally {
                commit('setLoading', false);
            }
        },

        async loadMorePosts({state, commit}) {
            commit('setPage', state.page + 1);

            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });

                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
                
            } catch(e) {
                console.log(`Ошибка ${e}`);
            } 
        }
    },

    namespaced: true
}