export default {
    mounted(el, binding) {
        console.log('fgfgfgfg', el);
        console.log('binding', binding.value);

        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting === true) {
                // this.loadMorePosts();
                binding.value();
                console.log('пересечение');
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },

    name: 'intersection'
}