import { createApp } from 'vue';
import App from './App';
import components from '@/components/UI/';
import router from './router/router';
import directives from './directives';
import store from '@/store';

const app = createApp(App);

components.forEach((item) => {
    app.component(item.name, item);
});

app.component('blog-post', {
    render() {
      return h('div', [
        h('header', this.$slots.header()),
        h('main', this.$slots.default()),
        h('footer', this.$slots.footer())
      ])
    }
});

directives.forEach((directive) => {
    app.directive(directive.name, directive);
});

app
    .use(store)
    .use(router)
    .mount('#app-m');
