<template>
<div id="body">
    
    <PageHeader/>

    <main id="main" class="main">
      <section class="user">
            <h2> Mes informations</h2>
            <div class="user__profile">
                <p class="user__firstname">Prénom : <span>{{ this.firstname }}</span></p>
                <p class="user__name">Nom : <span>{{ this.name }}</span></p>
                <p class="user__email">Email : <span>{{ this.email }}</span></p>
                <button @click.prevent="deleteUser()" class="user__delete" title="Supprimer le compte utilisateur"> Supprimer mon compte </button>   
            </div>
            <div class="user__posts">
              <h2> Mes publications</h2>
              <PostBloc v-for="post in showUserPosts" :key="post.id" :post="post"/>
            </div>
        </section>
    </main>
    <PageFooter/>
</div>
</template>
    

<script>

import PageHeader from '../components/PageHeader.vue';
import PostBloc from '../components/PostBloc.vue';
import PageFooter from '@/components/PageFooter.vue';
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {

  components: {
    PageHeader,
    PostBloc,
    PageFooter
  },

  props: {
        post: Object
  },

  data() {
        return {
            posts: [],
            name: "",
            firstname: "",
            email: "",
            profileImg: null,
            profileImgPreview: null,
        }
  },

  computed: {
    ...mapGetters(["showUserPosts"])
  },

  methods: {
    ...mapActions(["getUserPosts"]),

    getProfile() {
      axios.get('http://localhost:3000/api/auth/' + localStorage.getItem('userId'), {
                  headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
              })
      .then((res) => {
        this.name = res.data.name,
        this.firstname = res.data.firstname,
        console.log(this.firstname),
        this.email = res.data.email
      })
      .catch((error) => {
        console.log(error);
      });
    },

    deleteUser() {
      Swal.fire({
          title: "Confirmer la suppression de votre compte ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Oui",
          confirmButtonColor: "#32c068",
          cancelButtonText: "Non",
          cancelButtonColor: "#e24b43",
      })
      .then((response) => {
        if (response.isConfirmed) {
            axios.delete('http://localhost:3000/api/auth/' + localStorage.getItem('userId'), {
                        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                    })
            .then(() => {
              localStorage.clear();  
              Swal.fire({
                  icon: 'success',
                  title: 'Votre compte a bien été supprimé !',
                  })
              this.$router.push("/")
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
          console.log(error);
      });
    },
  },

  created(){
    this.getProfile();
  },

  mounted() {
    this.getUserPosts();
  }

}
</script>

<style lang="scss">

  .user {
    display: flex;
    flex-direction: column;
    &__profile {
      border: solid 5px #fff;
      background-color: #FFD7D7;
      border-radius: 10px;
      width: 50%;
      margin: auto;
      & span {
        font-weight: bold;
      }
    }
    & h2 {
      text-align: center;
      width: 200px;
      color: #fff;
      margin: auto;
      margin-top: 50px;
      margin-bottom: 30px;
      border-bottom: solid 7px #FD2D01;
    }
    &__delete {
      border: none;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 7px;
      padding: 7px;
      background-color: #4E5166;
      color: #FFf;
      cursor: pointer;
      &:hover {
        background-color: #FD2D01;
      }
      &:active {
        background-color: #FD2D01;
      }
    }
  }

  .user__profile__image {
        
      & img{
        background-color: #fff;
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 100%;
      }
  }

// Responsive mobile
@media screen and (max-width: 768px) {
  .user {
      & h2 {
        margin-top: 20px;
      }
      &__profile {
        width: 100%;
        border: none;
        border-radius: 0px;
      }
      &__posts {
        margin-top: 40px;
      }
  }
}  
</style>