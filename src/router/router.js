import Main from '@/pages/Main';
import { createRouter, createWebHistory } from 'vue-router';
import PostPages from '@/pages/PostPages';
import PostPagesWithStore from '@/pages/PostPagesWithStore';
import About from '@/pages/About';
import PostForMe from '@/pages/PostPagesForMe';
import SinglePost from '@/pages/SinglePost.vue';
import PostPagesCompositionApi from '@/pages/PostPagesCompositionApi'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPages
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts-me',
        component: PostForMe
    },
    {
        path: '/posts/:id',
        component: SinglePost
    },
    {
        path: '/store',
        component: PostPagesWithStore
    },
    {
        path: '/composition',
        component: PostPagesCompositionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;