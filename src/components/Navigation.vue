<template>
  <div class="navigation">
    <!-- <router-link class="navigation__link" to="/">Главная</router-link>
    <router-link class="navigation__link" to="/posts">Немного постов</router-link>
    <router-link class="navigation__link" to="/about">О приложении</router-link>
    <router-link class="navigation__link" to="/posts-me">Тестовые посты для меня</router-link> -->
    <buttonCommon @click="$router.push('/')" class="navigation__link">Главная</buttonCommon>
    <buttonCommon @click="$router.push('/posts')" class="navigation__link">Посты с автоподгрузкой</buttonCommon>
    <buttonCommon @click="$router.push('/posts-me')" class="navigation__link">Посты с пагинацией</buttonCommon>
    <buttonCommon @click="$router.push('/store')" class="navigation__link">Vuex</buttonCommon>
    <buttonCommon @click="$router.push('/about')" class="navigation__link">О приложении</buttonCommon>
    <!-- <buttonCommon @click="$router.push('/composition')" class="navigation__link">Composition</buttonCommon> -->
  </div>
</template>

<script>

export default {

}
</script>

<style>
  .navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
  }

  @media (max-width: 767px) {
    .navigation {
      flex-direction: column;
      align-items: center;
      height: auto;
    }    
  }

  .navigation__link {
    margin: 5px;
    background-color: rgb(152, 187, 182);
    color: rgb(12, 116, 102);
    font-weight: 600;
    text-decoration: none;
    height: 100%;
  }
</style>