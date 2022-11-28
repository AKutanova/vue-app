export default {
    mounted(el) {
        // console.log(el);
        console.log('fjfjfj');
        el.setAttribute('tabindex', '0');
        el.focus();    
    },

    name: 'focus'
}