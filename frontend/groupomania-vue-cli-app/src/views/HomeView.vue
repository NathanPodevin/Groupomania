<template>
<div id="body">
    
    <PageHeader/>

    <main id="main" class="main">
        <div class="accueilBloc" >
        <PostBloc v-for="post in showPosts" :key="post.id" :post="post"/>
        </div>
    </main>

</div>
</template>
    

<script>
import PageHeader from '../components/PageHeader.vue';
import PostBloc from '../components/PostBloc.vue';
import {mapActions, mapGetters} from 'vuex';

export default {
  components: {
    PageHeader,
    PostBloc
    },
    computed: {
        ...mapGetters(["showPosts"])
    },
    methods: {
        ...mapActions(["getPosts"]),
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss">
#body {
    background: #4E5166;
     height: 100%;
};

.main {
    min-height: 700px;
    margin-top: 40px;
    &__form {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        margin: 40px auto 50px auto;
        padding: 20px 20px;
        background: #FFD7D7;
        border-radius: 10px;
        font-size: 15px;
   }
}

// Responsive mobile
@media screen and (max-width: 768px) {
    a, p, label {
        font-size: 14px;
    }
    .main {
        min-height: 600px;
        background-size: contain;
        &__form {
            width: 60%;
            & .form-input, .form__btn {
                font-size: 14px;
                width: auto;
            }
        }
    }
    
}
</style>