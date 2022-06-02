<template>
<div id="body">
        <article class="post">
            <p class="post__user">Créé par <span>{{ post.User.firstname }} {{ post.User.name }}</span></p>
            <h3 class="post__title">{{ post.title }}</h3>
            <img class="post__img" :src="post.media" alt="photo de publication">
            <p class="post__description">{{ post.description }}</p>
        </article>
</div>
</template>
    

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'PostBloc',

    props: {
        post: Object
    },

    data() {
        return {
            posts: [],
        }
    },

    components: {

    },
    
    computed: {
        ...mapGetters(["showPosts"])
    },

    methods: {
        ...mapActions(["getPosts"]),
    }
  
}
</script>

<style lang="scss">
    .post{
        background-color: #FFD7D7;
        border-radius: 10px;
        border: solid 5px #fff;
        width: 45%;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 20px;
        align-items: center;
        margin-bottom: 40px;
        &__title{
            border-bottom: solid 7px #FD2D01;
            font-size: 25px;
        }
        &__user{
            font-size: 12px;
            width: 100%;
            text-align: left;
            & span {
                font-weight: bold;
            }
        }
        &__img{
            background-color: #fff;
            width: 350px;
            height: 350px;
            object-fit: cover;
            border: solid 10px #4E5166;
            border-radius: 10px;
        }
        &__description{
            width: 350px;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px 10px;
        }
    }
</style>