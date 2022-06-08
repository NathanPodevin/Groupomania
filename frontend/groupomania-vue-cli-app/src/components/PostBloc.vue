<template>
<div id="body">
        <article class="post">
            <button class="delete-publication" v-if="post.userId == this.$store.state.connectedUser" @click.prevent="deletePost(post.id)" title="Supprimer le post">X</button>
            <p class="post__user">Créé par <span>{{ post.User.firstname }} {{ post.User.name }}</span></p>
            <h3 class="post__title">{{ post.title }}</h3>
            <div class="post__bloc">    
                <img class="post__img" :src="post.media" alt="photo de publication">
                <p class="post__description">{{ post.description }}</p>
            </div>
            <!-- Commentaires -->
            <div class="post__comment">
                    <form @submit.prevent="createComment(post.id)" class="post__comment__bloc">
                        <textarea type="text" class="post__comment__bloc__input" placeholder="Écrivez un commentaire ..." v-model="content" aria-label="Commenter la publication" required></textarea>
                        <button type="submit" class="post__comment__bloc__button" title="Publier le commentaire">></button>
                    </form>
            <div class="post__comment__content" v-for="comment in post.Comments" :key="comment.id">
                <p>{{ comment.content }}</p>
                <div class="post__comment__user">
                    <p>{{ comment.user.firstname}} {{ comment.user.name}}</p>
                </div>
            </div>
            </div>
        </article>
</div>
</template>
    

<script>

import {mapActions, mapGetters} from 'vuex';
import axios from 'axios';

export default {
    name: 'PostBloc',

    props: {
        post: Object,
    },

    data() {
        return {
            posts: [],
            content: null,
        }
    },

    components: {

    },
    
    computed: {
        ...mapGetters(["showPosts"])
    },

    methods: {
        ...mapActions(["getPosts"]),

        createComment(postId) {
            axios.post('http://localhost:3000/api/comments', { 
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + localStorage.getItem('token') },
                postId: postId,
                userId: localStorage.getItem('userId'),
                content: this.content,
            })
                .then(() => {
                    this.getPosts();
                    console.log(this.comment.User.firstname);
                    location.reload();
                    this.content = null;
  
                })
                .catch((error) => {
                    console.log(error);
                })
        },

        deletePost(postId) {
            axios.delete('http://localhost:3000/api/post/' + postId, { 
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + localStorage.getItem('token') },
            })
            .then(() => {
                    this.getPosts();
                })
                .catch((error) => {
                    console.log(error);
                })
        },
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
            font-size: 16px;
            width: 100%;
            text-align: left;
            & span {
                font-weight: bold;
            }
        }
        &__bloc{
            background-color: #4E5166;
            border-top: solid 10px #4E5166;
            border-radius: 10px;
        }
        &__img{
            background-color: #fff;
            width: 350px;
            height: 350px;
            object-fit: cover;
        }
        &__description{
            width: 350px;
            font-size: 18px;
            color: #fff;
            padding: 10px;
        }
        &__comment {
            background-color: #fff;
            border-radius: 10px;
            width: 350px;
            padding: 10px 10px;
            margin-top: 15px;
            &__bloc {
                display: flex;
                border-radius: 7px;
                color: #4E5166;
                width: 90%;
                padding: 3px;
                margin: auto;
                margin-bottom: 15px;
                height: auto;
                &__input {
                    width: 85%;
                    font-family:  Avenir, Helvetica, Arial, sans-serif;
                    border: none;
                    border-radius: 7px 0px 0px 7px;
                    height: 20px;
                    padding: 0px 0px 0px 5px;
                    background-color: #FFD7D7;

                }
                &__button {
                    height: 20px;
                    font-weight: bold;
                    width: 15%;
                    color: #fff;
                    background-color: #4E5166;
                    border-radius: 0px 7px 7px 0px;
                    cursor: pointer;
                    &:hover {
                        background-color: #62646e;
                    }
                    &:active{
                        background-color: #62646e;
                    }
                }
            }
            &__content {
                border-top: solid 1px #4E5166;
                padding: 12px 0px;
                & p {
                    text-align: left;
                    margin-left: 30px;
                }
 
            }
            &__user p{
                font-size: 12px;
                font-weight: bold;
                text-align: right;
                margin: 10px 30px 0px 0px;
            }
        }
    }
    .delete-publication {
        display: flex;
        border: none;
        background-color: #FD2D01;
        color: #fff;
        border-radius: 3px;
        font-weight: bold;
        margin-left: auto;
        &:hover{
            background-color: #ca2d0d;
        }
    }

    // Responsive mobile
@media screen and (max-width: 768px) {
   body {
       margin: 0px;
   }
   .post {
       width: 100%;
       padding: 0px;
       border: none;
       border-radius: 0px;
       margin-bottom: 70px;
       &__bloc {
           border: none;
           border-radius: 0px;
            background-color: #FFD7D7;
       }
       &__img {
           width: 100%;
           height: 100%;
       }
       &__description {
           color: #4E5166;
        width: auto;
       }
       &__comment {
           margin-top: 0px;
           width: 100%;
           padding: 0px;
           border-radius: 0px;
           padding-top: 15px;
       }
       &__user {
           width: auto;
           text-align: left;
           margin-top: 20px;
       }
   } 
}
</style>