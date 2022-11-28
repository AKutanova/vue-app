<template>
    <blog-post>
        <template v-slot:header>
        <h1>Обо мне</h1>
        </template>
    
        <template v-slot:default>
        <p>
            Какое-то содержимое страницы, которое будет доступно в $slots.default.
        </p>
        </template>
    
        <template v-slot:footer>
        <p>Copyright 2022 Evan You</p>
        </template>
    </blog-post>    
</template>